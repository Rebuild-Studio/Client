import * as THREE from "three";

import { TGALoader } from "three/examples/jsm/loaders/TGALoader.js";

import { LoaderUtils } from "./LoaderUtils.js";

import { unzipSync, strFromU8 } from "three/examples/jsm/libs/fflate.module.js";
import storeContainer from "../stores/storeContainer";
import MetaObject from "./Studio/MetaObject.js";
import AddObjCommand from "../class/commands/CanvasObject/AddObjCommand";

function Loader() {
  const { common_store, canvasHistory_store } = storeContainer;

  var scope = this;
  // var ktx2Loader = new KTX2Loader();
  // ktx2Loader.setTranscoderPath("/basis/");
  // ktx2Loader.detectSupport(common_store.gl);

  this.texturePath = "";
  this.loadItemList = function (items) {
    LoaderUtils.getFilesFromItemList(items, function (files, filesMap) {
      scope.loadFiles(files, filesMap);
    });
  };

  this.loadFiles = async function (files, filesMap) {
    if (files.length > 0) {
      var _filesMap = filesMap || LoaderUtils.createFilesMap(files);

      var manager = new THREE.LoadingManager();
      manager.setURLModifier(function (url) {
        url = url.replace(/^(\.?\/)/, ""); // remove './'

        var file = _filesMap[url];

        if (file) {
          return URL.createObjectURL(file);
        }

        return url;
      });

      manager.addHandler(/\.tga$/i, new TGALoader());

      for (var i = 0; i < files.length; i++) {
        scope.loadFile(files[i], manager);
      }
    }
  };

  this.toBlob = async function (file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        const arrayBuffer = reader.result;
        const blob = new Blob([arrayBuffer], {
          type: "application/octet-stream",
        });
        resolve(blob);
      };

      reader.onerror = () => {
        reject(reader.error);
      };

      reader.readAsArrayBuffer(file);
    });
  };
  this.loadFile = async function (file, manager) {
    var filename = file.name;
    var extension = filename.split(".").pop().toLowerCase();

    var reader = new FileReader();

    // if (extension !== "glb" || extension !== "fbx") {
    //   return;
    // }
    // reader.addEventListener("progress", function (event) {
    //   var size = "(" + Math.floor(event.total / 1000).format() + " KB)";
    //   var progress = Math.floor((event.loaded / event.total) * 100) + "%";

    //   console.log("Loading", filename, size, progress);
    // });

    switch (extension) {
      case "3dm":
        reader.addEventListener(
          "load",
          async function (event) {
            var contents = event.target.result;

            var { Rhino3dmLoader } = await import(
              "three/examples/jsm/loaders/3DMLoader.js"
            );

            var loader = new Rhino3dmLoader();
            loader.setLibraryPath("../examples/jsm/libs/rhino3dm/");
            loader.parse(contents, function (object) {
              // editor.execute(new AddObjectCommand(editor, object));
            });
          },
          false
        );
        reader.readAsArrayBuffer(file);

        break;

      case "3ds":
        reader.addEventListener(
          "load",
          async function (event) {
            var { TDSLoader } = await import(
              "three/examples/jsm/loaders/TDSLoader.js"
            );

            var loader = new TDSLoader();
            loader.parse(event.target.result);

            // editor.execute(new AddObjectCommand(editor, object));
          },
          false
        );
        reader.readAsArrayBuffer(file);

        break;

      case "3mf":
        reader.addEventListener(
          "load",
          async function (event) {
            var { ThreeMFLoader } = await import(
              "three/examples/jsm/loaders/3MFLoader.js"
            );

            var loader = new ThreeMFLoader();
            loader.parse(event.target.result);

            // editor.execute(new AddObjectCommand(editor, object));
          },
          false
        );
        reader.readAsArrayBuffer(file);

        break;

      case "amf":
        reader.addEventListener(
          "load",
          async function (event) {
            var { AMFLoader } = await import(
              "three/examples/jsm/loaders/AMFLoader.js"
            );

            var loader = new AMFLoader();
            loader.parse(event.target.result);

            // editor.execute(new AddObjectCommand(editor, amfobject));
          },
          false
        );
        reader.readAsArrayBuffer(file);

        break;

      case "dae":
        reader.addEventListener(
          "load",
          async function (event) {
            var contents = event.target.result;

            var { ColladaLoader } = await import(
              "three/examples/jsm/loaders/ColladaLoader.js"
            );

            var loader = new ColladaLoader(manager);
            var collada = loader.parse(contents);

            collada.scene.name = filename;

            // editor.execute(new AddObjectCommand(editor, collada.scene));
          },
          false
        );
        reader.readAsText(file);

        break;

      case "drc":
        reader.addEventListener(
          "load",
          async function (event) {
            var contents = event.target.result;

            var { DRACOLoader } = await import(
              "three/examples/jsm/loaders/DRACOLoader.js"
            );

            var loader = new DRACOLoader();
            loader.setDecoderPath("../examples/js/libs/draco/");
            loader.decodeDracoFile(contents, function (geometry) {
              var object;
              var material;

              if (geometry.index !== null) {
                material = new THREE.MeshStandardMaterial();

                object = new THREE.Mesh(geometry, material);
                object.name = filename;
              } else {
                material = new THREE.PointsMaterial({ size: 0.01 });
                material.vertexColors = geometry.hasAttribute("color");

                object = new THREE.Points(geometry, material);
                object.name = filename;
              }

              loader.dispose();
              // editor.execute(new AddObjectCommand(editor, object));
            });
          },
          false
        );
        reader.readAsArrayBuffer(file);

        break;

      case "fbx":
        reader.addEventListener(
          "load",
          async function (event) {
            var contents = event.target.result;

            var { FBXLoader } = await import(
              "three/examples/jsm/loaders/FBXLoader.js"
            );

            var loader = new FBXLoader(manager);
            var object = loader.parse(contents);

            renderingContext_store.scene.add(object);

            // editor.execute(new AddObjectCommand(editor, object));
          },
          false
        );
        reader.readAsArrayBuffer(file);

        break;

      case "glb": {
        const blobGlb = await this.toBlob(file);
        reader.addEventListener(
          "load",
          async function (event) {
            var contents = event.target.result;

            var { DRACOLoader } = await import(
              "three/examples/jsm/loaders/DRACOLoader.js"
            );
            var { GLTFLoader } = await import(
              "three/examples/jsm/loaders/GLTFLoader.js"
            );
            var { KTX2Loader } = await import(
              "three/examples/jsm/loaders/KTX2Loader"
            );

            var dracoLoader = new DRACOLoader();
            dracoLoader.setDecoderPath("/draco/gltf/");

            var ktx2Loader = new KTX2Loader();
            ktx2Loader.setTranscoderPath("/basis/");
            ktx2Loader.detectSupport(renderingContext_store.gl);

            var loader = new GLTFLoader();
            loader.setDRACOLoader(dracoLoader);
            loader.setKTX2Loader(ktx2Loader);
            loader.parse(contents, "", function (result) {
              var scene = result.scene;
              scene.traverse((child) => {
                if (child.isMesh) {
                  child.receiveShadow = true;
                  child.castShadow = true;
                }
              });
              scene.name = filename.split(".")[0];

              scene.animations.push(...result.animations);
              // editor.execute(new AddObjectCommand(editor, scene));
              const tempObject = new MetaObject(scene, {
                name: scene.name,

                blobGlb: blobGlb,

                loadJson: false,
                type: "3DAsset",
              });

              canvasHistory_store.execute(
                new AddObjCommand(tempObject, tempObject.objectId)
              );
            });
          },
          false
        );
        reader.readAsArrayBuffer(file);

        break;
      }
      case "gltf":
        reader.addEventListener(
          "load",
          async function (event) {
            var contents = event.target.result;

            var loader;

            if (isGLTF1(contents)) {
              alert(
                "Import of glTF asset not possible. Only versions >= 2.0 are supported. Please try to upgrade the file to glTF 2.0 using glTF-Pipeline."
              );
            } else {
              var { DRACOLoader } = await import(
                "three/examples/jsm/loaders/DRACOLoader.js"
              );
              var { GLTFLoader } = await import(
                "three/examples/jsm/loaders/GLTFLoader.js"
              );

              var dracoLoader = new DRACOLoader();
              dracoLoader.setDecoderPath("../examples/js/libs/draco/gltf/");

              loader = new GLTFLoader(manager);
              loader.setDRACOLoader(dracoLoader);
              // loader.setKTX2Loader(ktx2Loader);
            }

            loader.parse(contents, "", function (result) {
              var scene = result.scene;
              scene.name = filename;

              scene.animations.push(...result.animations);
              // editor.execute(new AddObjectCommand(editor, scene));
            });
          },
          false
        );
        reader.readAsArrayBuffer(file);

        break;

      case "js":
      case "json":
        reader.addEventListener(
          "load",
          function (event) {
            var contents = event.target.result;

            // 2.0

            if (contents.indexOf("postMessage") !== -1) {
              var blob = new Blob([contents], { type: "text/javascript" });
              var url = URL.createObjectURL(blob);

              var worker = new Worker(url);

              worker.onmessage = function (event) {
                event.data.metadata = { version: 2 };
                handleJSON(event.data);
              };

              worker.postMessage(Date.now());

              return;
            }

            // >= 3.0

            var data;

            try {
              data = JSON.parse(contents);
            } catch (error) {
              alert(error);
              return;
            }

            handleJSON(data);
          },
          false
        );
        reader.readAsText(file);

        break;

      case "ifc":
        reader.addEventListener(
          "load",
          async function (event) {
            console.warn("ifc loader logic removed");
            /*
            var { IFCLoader } = await import(
              "three/examples/jsm/loaders/IFCLoader.js"
            );

            var loader = new IFCLoader();
            loader.ifcManager.setWasmPath("three/examples/jsm/loaders/ifc/");

            var model = await loader.parse(event.target.result);
            model.mesh.name = filename;
              */
            // editor.execute(new AddObjectCommand(editor, model.mesh));
          },
          false
        );
        reader.readAsArrayBuffer(file);

        break;

      case "kmz":
        reader.addEventListener(
          "load",
          async function (event) {
            var { KMZLoader } = await import(
              "three/examples/jsm/loaders/KMZLoader.js"
            );

            var loader = new KMZLoader();
            var collada = loader.parse(event.target.result);

            collada.scene.name = filename;

            // editor.execute(new AddObjectCommand(editor, collada.scene));
          },
          false
        );
        reader.readAsArrayBuffer(file);

        break;

      case "ldr":
      case "mpd":
        reader.addEventListener(
          "load",
          async function (event) {
            var { LDrawLoader } = await import(
              "three/examples/jsm/loaders/LDrawLoader.js"
            );

            var loader = new LDrawLoader();
            loader.setPath("three/examples/models/ldraw/officialLibrary/");
            loader.parse(event.target.result, undefined, function (group) {
              group.name = filename;
              // Convert from LDraw coordinates: rotate 180 degrees around OX
              group.rotation.x = Math.PI;

              // editor.execute(new AddObjectCommand(editor, group));
            });
          },
          false
        );
        reader.readAsText(file);

        break;

      case "md2":
        reader.addEventListener(
          "load",
          async function (event) {
            var contents = event.target.result;

            var { MD2Loader } = await import(
              "three/examples/jsm/loaders/MD2Loader.js"
            );

            var geometry = new MD2Loader().parse(contents);
            var material = new THREE.MeshStandardMaterial();

            var mesh = new THREE.Mesh(geometry, material);
            mesh.mixer = new THREE.AnimationMixer(mesh);
            mesh.name = filename;

            mesh.animations.push(...geometry.animations);
            // editor.execute(new AddObjectCommand(editor, mesh));
          },
          false
        );
        reader.readAsArrayBuffer(file);

        break;

      case "obj":
        reader.addEventListener(
          "load",
          async function (event) {
            var contents = event.target.result;

            var { OBJLoader } = await import(
              "three/examples/jsm/loaders/OBJLoader.js"
            );

            var object = new OBJLoader().parse(contents);
            object.name = filename;

            // editor.execute(new AddObjectCommand(editor, object));
          },
          false
        );
        reader.readAsText(file);

        break;

      case "ply":
        reader.addEventListener(
          "load",
          async function (event) {
            var contents = event.target.result;

            var { PLYLoader } = await import(
              "three/examples/jsm/loaders/PLYLoader.js"
            );

            var geometry = new PLYLoader().parse(contents);
            var object;
            var material;

            if (geometry.index !== null) {
              material = new THREE.MeshStandardMaterial();

              object = new THREE.Mesh(geometry, material);
              object.name = filename;
            } else {
              material = new THREE.PointsMaterial({ size: 0.01 });
              material.vertexColors = geometry.hasAttribute("color");

              object = new THREE.Points(geometry, material);
              object.name = filename;
            }

            // editor.execute(new AddObjectCommand(editor, object));
          },
          false
        );
        reader.readAsArrayBuffer(file);

        break;

      case "stl":
        reader.addEventListener(
          "load",
          async function (event) {
            var contents = event.target.result;

            var { STLLoader } = await import(
              "three/examples/jsm/loaders/STLLoader.js"
            );

            var geometry = new STLLoader().parse(contents);
            var material = new THREE.MeshStandardMaterial();

            var mesh = new THREE.Mesh(geometry, material);
            mesh.name = filename;

            // editor.execute(new AddObjectCommand(editor, mesh));
          },
          false
        );

        if (reader.readAsBinaryString !== undefined) {
          reader.readAsBinaryString(file);
        } else {
          reader.readAsArrayBuffer(file);
        }

        break;

      case "svg":
        reader.addEventListener(
          "load",
          async function (event) {
            var contents = event.target.result;

            var { SVGLoader } = await import(
              "three/examples/jsm/loaders/SVGLoader.js"
            );

            var loader = new SVGLoader();
            var paths = loader.parse(contents).paths;

            //

            var group = new THREE.Group();
            group.scale.multiplyScalar(0.1);
            group.scale.y *= -1;

            for (var i = 0; i < paths.length; i++) {
              var path = paths[i];

              var material = new THREE.MeshBasicMaterial({
                color: path.color,
                depthWrite: false,
              });

              var shapes = SVGLoader.createShapes(path);

              for (var j = 0; j < shapes.length; j++) {
                var shape = shapes[j];

                var geometry = new THREE.ShapeGeometry(shape);
                var mesh = new THREE.Mesh(geometry, material);

                group.add(mesh);
              }
            }

            // editor.execute(new AddObjectCommand(editor, group));
          },
          false
        );
        reader.readAsText(file);

        break;

      case "vox":
        reader.addEventListener(
          "load",
          async function (event) {
            var contents = event.target.result;

            var { VOXLoader, VOXMesh } = await import(
              "three/examples/jsm/loaders/VOXLoader.js"
            );

            var chunks = new VOXLoader().parse(contents);

            var group = new THREE.Group();
            group.name = filename;

            for (let i = 0; i < chunks.length; i++) {
              const chunk = chunks[i];

              const mesh = new VOXMesh(chunk);
              group.add(mesh);
            }

            // editor.execute(new AddObjectCommand(editor, group));
          },
          false
        );
        reader.readAsArrayBuffer(file);

        break;

      case "vtk":
        reader.addEventListener(
          "load",
          async function (event) {
            var contents = event.target.result;

            var { VTKLoader } = await import(
              "three/examples/jsm/loaders/VTKLoader.js"
            );

            var geometry = new VTKLoader().parse(contents);
            var material = new THREE.MeshStandardMaterial();

            var mesh = new THREE.Mesh(geometry, material);
            mesh.name = filename;

            // editor.execute(new AddObjectCommand(editor, mesh));
          },
          false
        );
        reader.readAsArrayBuffer(file);

        break;

      case "wrl":
        reader.addEventListener(
          "load",
          async function (event) {
            var contents = event.target.result;

            var { VRMLLoader } = await import(
              "three/examples/jsm/loaders/VRMLLoader.js"
            );

            new VRMLLoader().parse(contents);

            // editor.execute(new SetSceneCommand(editor, result));
          },
          false
        );
        reader.readAsText(file);

        break;

      case "xyz":
        reader.addEventListener(
          "load",
          async function (event) {
            var contents = event.target.result;

            var { XYZLoader } = await import(
              "three/examples/jsm/loaders/XYZLoader.js"
            );

            var geometry = new XYZLoader().parse(contents);

            var material = new THREE.PointsMaterial();
            material.vertexColors = geometry.hasAttribute("color");

            var points = new THREE.Points(geometry, material);
            points.name = filename;

            // editor.execute(new AddObjectCommand(editor, points));
          },
          false
        );
        reader.readAsText(file);

        break;

      case "zip":
        reader.addEventListener(
          "load",
          function (event) {
            handleZIP(event.target.result);
          },
          false
        );
        reader.readAsArrayBuffer(file);

        break;

      default:
        console.error("Unsupported file format (" + extension + ").");

        break;
    }
  };

  function handleJSON(data) {
    if (data.metadata === undefined) {
      // 2.0

      data.metadata = { type: "Geometry" };
    }

    if (data.metadata.type === undefined) {
      // 3.0

      data.metadata.type = "Geometry";
    }

    if (data.metadata.formatVersion !== undefined) {
      data.metadata.version = data.metadata.formatVersion;
    }

    var loader;
    switch (data.metadata.type.toLowerCase()) {
      case "buffergeometry":
        loader = new THREE.BufferGeometryLoader();
        var result = loader.parse(data);

        new THREE.Mesh(result);

        // editor.execute(new AddObjectCommand(editor, mesh));

        break;

      case "geometry":
        console.error('Loader: "Geometry" is no longer supported.');

        break;

      case "object":
        loader = new THREE.ObjectLoader();
        loader.setResourcePath(scope.texturePath);

        loader.parse(data, function (result) {
          if (result.isScene) {
            // editor.execute(new SetSceneCommand(editor, result));
          } else {
            // editor.execute(new AddObjectCommand(editor, result));
          }
        });

        break;

      case "app":
        // editor.fromJSON(data);

        break;
      default:
        break;
    }
  }

  async function handleZIP(contents) {
    var zip = unzipSync(new Uint8Array(contents));

    // Poly

    if (zip["model.obj"] && zip["materials.mtl"]) {
      var { MTLLoader } = await import(
        "three/examples/jsm/loaders/MTLLoader.js"
      );
      var { OBJLoader } = await import(
        "three/examples/jsm/loaders/OBJLoader.js"
      );

      var materials = new MTLLoader().parse(strFromU8(zip["materials.mtl"]));
      new OBJLoader()
        .setMaterials(materials)
        .parse(strFromU8(zip["model.obj"]));
      // editor.execute(new AddObjectCommand(editor, object));
    }

    //

    for (var path in zip) {
      var file = zip[path];

      var manager = new THREE.LoadingManager();
      manager.setURLModifier(function (url) {
        var file = zip[url];

        if (file) {
          console.log("Loading", url);

          var blob = new Blob([file.buffer], {
            type: "application/octet-stream",
          });
          return URL.createObjectURL(blob);
        }

        return url;
      });

      var extension = path.split(".").pop().toLowerCase();

      var loader;
      switch (extension) {
        case "fbx":
          var { FBXLoader } = await import(
            "three/examples/jsm/loaders/FBXLoader.js"
          );

          loader = new FBXLoader(manager);
          break;
        case "glb":
        case "gltf":
          var { DRACOLoader } = await import(
            "three/examples/jsm/loaders/DRACOLoader.js"
          );
          var { GLTFLoader } = await import(
            "three/examples/jsm/loaders/GLTFLoader.js"
          );

          var dracoLoader = new DRACOLoader();
          dracoLoader.setDecoderPath("../examples/js/libs/draco/gltf/");

          loader = new GLTFLoader();
          loader.setDRACOLoader(dracoLoader);
          break;
        default:
          break;
      }
      switch (extension) {
        case "fbx":
          loader.parse(file.buffer);

          // editor.execute(new AddObjectCommand(editor, object));

          break;

        case "glb":
          loader.parse(file.buffer, "", function (result) {
            var scene = result.scene;

            scene.animations.push(...result.animations);
            // editor.execute(new AddObjectCommand(editor, scene));
          });

          break;

        case "gltf":
          loader.parse(strFromU8(file), "", function (result) {
            var scene = result.scene;

            scene.animations.push(...result.animations);
            // editor.execute(new AddObjectCommand(editor, scene));
          });

          break;
        default:
      }
    }
  }

  function isGLTF1(contents) {
    var resultContent;

    if (typeof contents === "string") {
      // contents is a JSON string
      resultContent = contents;
    } else {
      var magic = THREE.LoaderUtils.decodeText(new Uint8Array(contents, 0, 4));

      if (magic === "glTF") {
        // contents is a .glb file; extract the version
        var version = new DataView(contents).getUint32(4, true);

        return version < 2;
      } else {
        // contents is a .gltf file
        resultContent = THREE.LoaderUtils.decodeText(new Uint8Array(contents));
      }
    }

    var json = JSON.parse(resultContent);

    return json.asset !== undefined && json.asset.version[0] < 2;
  }
}

export { Loader };
