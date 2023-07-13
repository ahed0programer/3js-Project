
function skybox(){
    // Load the texture cube
    const loader = new THREE.CubeTextureLoader();
    const skyboxTexture = loader.load([
        'skybox/right.png',
        'skybox/left.png',
        'skybox/top.png',
        'skybox/bottom.png',
        'skybox/front.png',
        'skybox/back.png'
    ]);
    
    // Create a material from the texture cube
    const skyboxMaterial = new THREE.MeshBasicMaterial({
        map: skyboxTexture,
        side: THREE.BackSide,
        emissive : 0xffffff
    });
    
    // Create a box geometry
    const skyboxGeometry = new THREE.BoxGeometry(5000, 5000, 5000);
    
    // Create a mesh object using the box geometry and material
    const skyboxMesh = new THREE.Mesh(skyboxGeometry, skyboxMaterial);
    
    // Add the skybox mesh object to the scene
    return skyboxMesh;

} 

// function skybox(){
//        const textureLoader = new THREE.TextureLoader();
//        const texture0 = textureLoader.load('skybox/right.png');
//        const texture1 = textureLoader.load('skybox/left.png');
//        const texture2 = textureLoader.load('skybox/top.png');
//        const texture3 = textureLoader.load('skybox/bottom.png');
//        const texture4 = textureLoader.load('skybox/front.png');
//        const texture5 = textureLoader.load('skybox/back.png');
//        const cubeTexture = new THREE.CubeTexture([
//          texture0,
//          texture1,
//          texture2,
//          texture3,
//          texture4,
//          texture5
//        ]);

        
//           const shader = THREE.ShaderLib['cube'];
//           //shader.uniforms['tCube'].value = cubeTexture;
//           const material = new THREE.ShaderMaterial({
//             fragmentShader: shader.fragmentShader,
//             vertexShader: shader.vertexShader,
//             uniforms: { value:cubeTexture},
//             depthWrite: false,
//             side: THREE.BackSide
//           });

//              const geometry = new THREE.BoxGeometry(10000, 10000, 10000);
//              const skybox = new THREE.Mesh(geometry, material);
//              return skybox
// }