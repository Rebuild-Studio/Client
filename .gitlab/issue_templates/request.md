# 📋 PR 설명

# 📡 핵심 기능

# 📸 시각 자료(캡처 화면)

# 🛠️ 이슈 및 앞으로 할 일

# 🤖 `PR` 셀프 체크리스트 🤖

> 코드 확인 후 `[ ]`사이 공백을 `x`로 체크하시오

## ⌨️ 코드 컨벤션!

- [ ] 불필요한 console 디버깅 코드는 제거했나요? (스토리북 예외)
    
- [ ] 변수명 혹은 파일명이 너무 추상적이지는 않나요?

- [ ] 불필요한 공백을 제거하셨나요?
    <details>
    <summary> 예시 </summary>
    
    ```react
    <AppWrapper>
        <MenuBar />
        <Scene />
          // <- X
    </AppWrapper>
    ```
    </details>
    
- [ ] 불필요한 주석을 제거하셨나요?
    <details>
    <summary> 예시 </summary>
    
    ```react
      // primitiveStore.addPrimitive(                          // <- X
      //   storeId,                                            // <- X
      //   renderSelectedGroup(storeId, mesh.clone())          // <- X
      // );                                                    // <- X
    ```
    </details>
    - 
