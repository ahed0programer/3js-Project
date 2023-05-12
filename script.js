
      // import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.132.2/build/three.min.js";
      // import  {OrbitControls}from "https://cdn.jsdelivr.net/npm/three@0.132.2/examples/js/controls/OrbitControls.js"
      // import {OBJLoader} from "https://cdn.jsdelivr.net/npm/three@0.132.2/examples/js/loaders/OBJLoader.js"
      // import {MTLLoader} from "https://cdn.jsdelivr.net/npm/three@0.132.2/examples/js/loaders/MTLLoader.js"
      // import {CANNON} from "https://unpkg.com/cannon/build/cannon.min.js"

        // Hello Cube App
         // Your first Three.js application
         // sizes
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
         
         
         //plane 
         const planegeometry = new THREE.PlaneGeometry( 2000, 2000 ,30,30);
         const planematerial = new THREE.MeshBasicMaterial( {color: 0x8f8f8f, side: THREE.DoubleSide , wireframe :true  } );
         const plane = new THREE.Mesh( planegeometry, planematerial );
         plane.rotation.x=0.5*3.14

         plane.recieveShadow = true
         scene.add( plane );
   
         // 
         const controls = new THREE.OrbitControls (camera, renderer.domElement );
         //

         const OBJmodel = new THREE.Object3D();

         // Static Factors
         const massElement = document.getElementById("mass");
         const M_W_angleElement = document.getElementById("M_W_angle");
         const M_W_areaElement = document.getElementById("M_W_area");
         const A_pressureElement = document.getElementById("A_pressure");

         const mass = massElement.value
         const M_W_angle = M_W_angleElement.value
         const M_W_area = M_W_areaElement.value
         const A_pressure = A_pressureElement.value
         console.log(mass)

         let obj;
         const objLoader = new THREE.OBJLoader()
         const mtlLoader = new THREE.MTLLoader()
         mtlLoader.load('Airplane_v1_L1/11803_Airplane_v1_l1.mtl', (materials) => {
            materials.preload()
            // loading geometry
         
            objLoader.setMaterials(materials)
            objLoader.load('Airplane_v1_L1/11803_Airplane_v1_l1.obj', function (object) {

               object.scale.x=0.05;
               object.scale.y=0.05;
               object.scale.z=0.05;
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
         OBJmodel.position.set(0,100,0)
         controls.target = OBJmodel.position 
         scene.add(OBJmodel)

         
         const container = document.querySelector('#threejs-container')
         container.append(renderer.domElement)

         // ........................

         // Create a Cannon.js world and set gravity
         const world = new CANNON.World();
         world.gravity.set(0, -9.82, 0);

         // create ground
         const groundShape = new CANNON.Plane();
         const groundBody = new CANNON.Body({ mass: 0, shape: groundShape });
         groundBody.position.set(0, 0, 0);
         groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(-1, 0, 0), Math.PI / 2);
         world.addBody(groundBody);
         
         // Create a box shape for collision detection
         const modelShape = new CANNON.Box(new CANNON.Vec3(0.5, 0.5, 0.5));
         // Create a body for the 3D model and add it to the world
         const body = new CANNON.Body({
           mass: parseInt(mass),
           position: new CANNON.Vec3(1,0,1),
           shape: modelShape,
         });
         body.quaternion.set(OBJmodel.quaternion.x, OBJmodel.quaternion.y, OBJmodel.quaternion.z,OBJmodel.quaternion.w)
         world.addBody(body);
         
         
       // Get a reference to the Dynamic Factors
       const myElement = document.getElementById("force");
       const EngineForceElement = document.getElementById("Engineforce");
       const AirResistenceElemnt = document.getElementById("AirResistence");
       const accelerationElemnt = document.getElementById("acceleration");
       

       const R=8.31447 ; const M =0.0289644 ;

       const engineForce   = new CANNON.Vec3(0,0,0);
       const AirResistence = new CANNON.Vec3(0,0,0);

      
       
       // Change the content
      
         ///
         // your 3D model
         let rotationSpeed = 0.01;
         // Add event listener for keydown events
         document.addEventListener('keydown', function (event) {
           switch (event.keyCode) {

             case 37: // left arrow
               // Rotate model around Y axis in clockwise direction
               OBJmodel.rotation.y += rotationSpeed;
               
               break;

             case 38: // up arrow
               // Move model along positive Z axis
               // body.position.x += Math.sin(OBJmodel.rotation.y);
               // body.position.z += Math.cos(OBJmodel.rotation.y);;
               // world.gravity.y +=0.3;
               engineForce.x+=100;
               EngineForceElement.innerHTML = engineForce.x ;
               accelerationElemnt.innerHTML = engineForce.x/body.mass ;
               break;

             case 39: // right arrow
               // Rotate model around Y axis in counter-clockwise direction
               OBJmodel.rotation.y -= rotationSpeed;
               
               break;

             case 40: // down arrow
               // Move model along negative Z axis
               //body.position.x -= 5;
               //world.gravity.y -= 0.3;
               engineForce.x-=100;
               EngineForceElement.innerHTML = engineForce.x ;
               accelerationElemnt.innerHTML = engineForce.x/body.mass ;
               break;
           }

         });

         // control interface buttons 
         const speedElement = document.getElementById("speed");
         const startElement = document.getElementById("start");
         const pauseElement = document.getElementById("pause");
         
         let status = false;
         startElement.addEventListener('click',function(){
            status=true
            engineForce.x=500;
            EngineForceElement.innerHTML = engineForce.x ;
            animate()
         })
         pauseElement.addEventListener('click',function(){
            status=false
         })

         function applyChanges(){
            AirResistence.x=0;
         }


         // rendering the scene
   
         function animate() {
            if(status)
            requestAnimationFrame(animate)
          
            speedElement.innerHTML =Math.floor(0.5+(3600*body.velocity.x/1000 ))
            world.step(1 / 60); // Step the simulation at 60fps

            body.applyForce(engineForce , body.position);

            OBJmodel.position.copy(body.position)
            //OBJmodel.quaternion.set(body.quaternion.x, body.quaternion.y, body.quaternion.z, body.quaternion.w);

            controls.update();
            renderer.render(scene, camera)
         }
         
         animate()

      