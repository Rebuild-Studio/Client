/*
커스텀 Env variables : Jenkins 프로젝트 config내에 설정되어 있음
env {
  docker_hub_registry_url : 도커허브 url
  hypercloud_mx_registry_url : 하이퍼 클라우드 mx스튜디오 레지스트리 url
  hypercloud_mx_registry_path : 하이퍼 클라우드 mx스튜디오 레지스트리 path ( https:// 제거)
  image_name : mx studio 이미지 명
  active_env : 배포할 환경 (master, gaia, dev, release)
}

*/
node {
  try {
    stage('========== Clone Repository ==========') {
      checkout scm
    }
    stage('========== Switch To Stable Image ==========') {
      int imageExists = sh(script: "docker image inspect ${image_name}:latest", returnStatus:true)

      if (imageExists == 0) { // 이미지 존재시
        echo("${image_name} EXISTS")
        app = docker.image(image_name + ':latest')

        docker.withRegistry(env.docker_hub_registry_url, 'docker_hub_credential') {
          app.push('stable')
        }
      } else {
        echo("${image_name} DOESN'T EXISTS. MOVE TO NEXT STAGE.")
      }
    }
    stage('========== Build image ==========') {
      withNPM(npmrcConfig: 'mx-npmrc-config'){
      app = docker.build(image_name + ':latest', "--build-arg ACTIVE_ENV=${env.active_env} .")
      }
    }
    stage('========== Push Image ==========') {
      docker.withRegistry(env.docker_hub_registry_url, 'docker_hub_credential') {
        app.push('latest')
      }
    }
    stage('========== Push Image To Private Registry ==========') {
      sh 'docker logout'

      sh "docker tag ${env.image_name}:latest ${env.hypercloud_mx_registry_path}/${env.image_name}:latest"

      app = docker.image("${env.hypercloud_mx_registry_path}/${image_name}:latest")

      docker.withRegistry(env.hypercloud_mx_registry_url, 'hypercloud_registry_credential') {
        app.push('latest')
      }
    }
    stage('========== Re-run MX-Studio Pod ==========') {
      if (env.active_env == 'master' || env.active_env == 'gaia'){
        sh 'kubectl config use-context master'
      } else {
        sh 'kubectl config use-context default'
      }
      sh "kubectl rollout restart deployment ${deployment_name}"
    }
  } finally {
    sh 'docker image prune -f'
  }
}
