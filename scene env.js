const width = window.innerWidth
const height = window.innerHeight
// scene
const scene = new THREE.Scene()
scene.background = new THREE.Color(0x000000)

const light = new THREE.DirectionalLight(0xffffff, 1);
scene.add(light);

light.castShadow = true
light.shadow.camera.near = 10
light.shadow.camera.far = 100
light.shadow.camera.left = -50
light.shadow.camera.right = 50
light.shadow.camera.top = 50
light.shadow.camera.bottom = -50

// renderer

const renderer = new THREE.WebGL1Renderer()
renderer.setSize(width/1.4, height/1.47)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.shadowMapEnabled = true
renderer.shadowMapType = THREE.PCFSoftShadowMap



// camera
var camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 10000)
camera.position.set(1, 3, 100)
camera.lookAt(0,1,0)

const listener = new THREE.AudioListener();
camera.add( listener );

//plane sound ....
//////
const sound = new THREE.Audio( listener );
const warning = new THREE.Audio( listener );
const hazard = new THREE.Audio( listener );
const audioLoader = new THREE.AudioLoader();
const Maxdistance = 2000;
const normal_valume = 0.5;

 audioLoader.load('sounds/prop-plane-14513.mp3', function( buffer ) {
     sound.setBuffer( buffer );
     sound.setLoop( true );
     sound.setVolume( normal_valume );
     
 });
 audioLoader.load('sounds/493567__original_sound__warning-alarm.mp3', function( buffer ) {
   warning.setBuffer( buffer );
   warning.setLoop( true );
   warning.setVolume( 1 );
 });
 audioLoader.load('sounds/493562__original_sound__hazard-alarm.mp3', function( buffer ) {
 hazard.setBuffer( buffer );
 hazard.setLoop( true );
 hazard.setVolume( 1 );
});
//It must be created or resumed after a user gesture on the page

// sky box
//scene.add(skybox())
//

//plane 
const planegeometry = new THREE.PlaneGeometry( 10000, 2000 ,30,30);
const planematerial = new THREE.MeshBasicMaterial( {color: 0x8f8f8f, side: THREE.DoubleSide , wireframe :true  } );
const plane = new THREE.Mesh( planegeometry, planematerial );
plane.rotation.x=0.5*3.14
plane.recieveShadow = true
scene.add( plane );

// 
const controls = new THREE.OrbitControls (camera, renderer.domElement );
//

const OBJmodel = new THREE.Object3D();

const objLoader = new THREE.OBJLoader()
const mtlLoader = new THREE.MTLLoader()
mtlLoader.load('Airplane_v1_L1/11803_Airplane_v1_l1.mtl', (materials) => {
   materials.preload()
   // loading geometry

   objLoader.setMaterials(materials)
   objLoader.load('Airplane_v1_L1/11803_Airplane_v1_l1.obj', function (object) {

      object.scale.x=0.01;
      object.scale.y=0.01;
      object.scale.z=0.01;
      object.position.y=10;
      object.rotation.x=-0.5*3.14
      object.castShadow = true
      object.recieveShadow = true
      // obj=object
      //
      OBJmodel.add(object);
      // scene.add(object)

   })
})

controls.target = OBJmodel.position 
scene.add(OBJmodel)

const container = document.querySelector('#threejs-container')
container.append(renderer.domElement)
