// import PhisicalOBJ from './Phisics.js'

      // Static Factors
      const massElement = document.getElementById("mass");
      const M_W_angleElement = document.getElementById("M_W_angle");
      const M_W_areaElemnt = document.getElementById("M_W_area");

       
       // Get a reference to the Dynamic Factors
       const myElement = document.getElementById("force");
       const EngineForceElement = document.getElementById("Engineforce");
       const AirResistenceElemnt = document.getElementById("AirResistence");
       const body_AreaElemnt = document.getElementById("body_AreaElemnt");
       //const M_W_AngleElemnt = document.getElementById("M_W_angle");
       const floating_forceElemnt = document.getElementById("floating_force");
       const L_wing_AElemnt = document.getElementById("L_wing");
       const R_wing_AElemnt = document.getElementById("R_wing");
       const LR_W_areaAElemnt = document.getElementById("LR_W_area");
       const LR_DistanceAElemnt = document.getElementById("LR_Distance");
       const highElemnt = document.getElementById("high");
       const R_pressureElemnt =document.getElementById("R_A_pressure");
       const TemparetureElemnt =document.getElementById("Tempareture");
       const pressureElement =document.getElementById("pressure");
       const pressure_DElemnt = document.getElementById("pressure_diff");
       const P_horizonElement =  document.getElementById("P_horizon");
       const densityElement =  document.getElementById("density");
       
       const g=9.81 ;const R=8.31447 ; const M =0.0289644 ;
       const temp=TemparetureElemnt.value ; const P0 = 14.6959*R_pressureElemnt.value ;
       const wings_area =2*M_W_areaElemnt.value; const body_area=body_AreaElemnt.value;
       const LR_W_area=LR_W_areaAElemnt.value; const LR_Distance= LR_DistanceAElemnt.value;
       const mass = massElement.value
       const M_W_angle = (M_W_angleElement.value * Math.PI)/180
       
       const gravity  = new THREE.Vector3(0,-mass*9.81,0);
       const engineForce   = new THREE.Vector3(0,0,0);
       const AirResistence = new THREE.Vector3(0,0,0);
       const FloatingForce = new THREE.Vector3(0,0,0);

       var L_wing_Angle =0 ;
       var R_wing_Angle =0 ;
       var plane_horizon=0 ;
      //  var high=body.position.y;
       var density=P0*M/(R*temp);
       var enginepower=0
       var pressure_D=0;
       var modelrotation=0;
      //  var xz_engine=0;
      //  var xz_floating=0;

        const phisicalbody = new PhisicalOBJ(mass , new THREE.Vector3(0,0,0) )
        //phisicalbody.quaternion = new THREE.Quaternion(0,0,0,Math.PI)
         let rotationSpeed = 0.01;
         // Add event listener for keydown events
         document.addEventListener('keydown', function (event) {
           switch (event.key) {

             case "ArrowLeft": // left arrow
               // Rotate model around Y axis in clockwise direction
              modelrotation -= rotationSpeed;
               
               break;

             case "ArrowUp": // up arrow
               // Move model along positive Z axis
               // body.position.x += Math.sin(OBJmodel.rotation.y);
               // body.position.z += Math.cos(OBJmodel.rotation.y);;
               // world.gravity.y +=0.3;
               enginepower +=50;
               EngineForceElement.innerHTML = enginepower ;
               break;

             case "ArrowRight": // right arrow
               // Rotate model around Y axis in counter-clockwise direction
               modelrotation += rotationSpeed;
               break;

             case "ArrowDown": // down arrow
               // Move model along negative Z axis
               //body.position.x -= 5;
               //world.gravity.y -= 0.3;
               enginepower-=50;
               EngineForceElement.innerHTML = enginepower ;
               break;

              case "1": 
                // decrease the left wing angle
                if(!L_wing_Angle < Math.PI/4 || !R_wing_Angle < Math.PI/4){
                L_wing_Angle-=Math.PI/40;
                R_wing_Angle-=Math.PI/40;
                }
                L_wing_AElemnt.innerHTML =parseInt((180*L_wing_Angle)/Math.PI);
                R_wing_AElemnt.innerHTML =parseInt((180*R_wing_Angle)/Math.PI) ;
                console.log("dsssss")
                break;

              case "7": 
                // decrease the left wing angle
                if(!L_wing_Angle > Math.PI/4 || !R_wing_Angle > Math.PI/4){
                L_wing_Angle+=Math.PI/40;
                R_wing_Angle+=Math.PI/40;
                }
                L_wing_AElemnt.innerHTML =parseInt((180*L_wing_Angle)/Math.PI) ;
                R_wing_AElemnt.innerHTML =parseInt((180*R_wing_Angle)/Math.PI) ;
                console.log("dsssss")
                break;

              case "9": 
                // decrease the left wing angle
                L_wing_Angle-=0.025;
                R_wing_Angle+=0.025;
                plane_horizon+=0.01
                R_wing_AElemnt.innerHTML =Math.floor((180*R_wing_Angle)/Math.PI);
                L_wing_AElemnt.innerHTML =Math.floor((180*L_wing_Angle)/Math.PI);
                console.log("dsssss")
                break;

              case "3": 
                // decrease the left wing angle
                L_wing_Angle+=0.025;
                R_wing_Angle-=0.025;
                plane_horizon-=0.01
                R_wing_AElemnt.innerHTML =Math.floor((180*R_wing_Angle)/Math.PI);
                L_wing_AElemnt.innerHTML =Math.floor((180*L_wing_Angle)/Math.PI);
                console.log("dsssss")
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
            sound.play();
            warning.play();
            warning.pause();
            //audioContext.resume()

            animate()
         })

         pauseElement.addEventListener('click',function(){
            sound.stop()
            warning.stop();
            //stopSound()
            status=false
         })

         /////////////

          // create your object
          //const object = new THREE.Mesh(geometry, material);
          
          // set the desired rotation axis
          const rotationAxis = new THREE.Vector3(1, 0, 0);
          
          // set the rotation angle (in radians)
          const rotationAngle = 0.05;
          
          // set the rotation matrix for the given axis and angle
          const rotationMatrix = new THREE.Matrix4().makeRotationAxis(rotationAxis, rotationAngle);
          
          // apply the rotation matrix to the object's matrix
          //object.matrix.multiply(rotationMatrix);
          
          // make sure to update the object's position and scale
          //object.matrix.decompose(object.position, object.quaternion, object.scale);

         ////////



         function applyChanges(){
           
            engineForce.x = enginepower*Math.cos(modelrotation);
            engineForce.z = enginepower*Math.sin(modelrotation);

            let vxz = Math.sqrt(phisicalbody.velocity.x*phisicalbody.velocity.x + phisicalbody.velocity.z*phisicalbody.velocity.z);

            airResist=0.5*vxz*vxz*density*wings_area*Math.sin(M_W_angle);
            LW_Resist =0.5*vxz*vxz*density*LR_W_area*Math.sin(L_wing_Angle);
            RW_Resist =0.5*vxz*vxz*density*LR_W_area*Math.sin(R_wing_Angle);

            AirResistence.x=-((RW_Resist+LW_Resist+airResist)*(Math.cos(modelrotation)));
            AirResistence.z=-((RW_Resist+LW_Resist+airResist)*(Math.sin(modelrotation)));

            AirResistence.y=-0.5*phisicalbody.velocity.y*phisicalbody.velocity.y*density*(wings_area*Math.cos(M_W_angle) +LR_W_area*Math.cos(R_wing_Angle)+LR_W_area*Math.cos(L_wing_Angle));
            if(phisicalbody.velocity.y<0){
              AirResistence.y = -AirResistence.y;
            }
            
            FloatingForce.y = (airResist*Math.cos(M_W_angle)+LW_Resist*Math.cos(L_wing_Angle)+ RW_Resist*Math.cos(R_wing_Angle))*Math.cos(plane_horizon) ;
            //////
            FloatingForce.x = airResist*Math.cos(M_W_angle)*Math.sin(modelrotation)*Math.sin(plane_horizon);
            FloatingForce.z = airResist*Math.cos(M_W_angle)*Math.cos(modelrotation)*Math.sin(plane_horizon);
            
            //OBJmodel.rotation.x=plane_horizon
            // OBJmodel.matrix.multiply(rotationMatrix)
            // OBJmodel.matrix.decompose(OBJmodel.position, OBJmodel.quaternion, OBJmodel.scale);
            // OBJmodel.rotation.y = -modelrotation
            
            phisicalbody.applyForce(engineForce.applyQuaternion(phisicalbody.quaternion) );
            phisicalbody.applyForce(AirResistence );
            phisicalbody.applyForce(FloatingForce , new THREE.Vector3(0,0,5));
            if(phisicalbody.position.y>0.2)
            phisicalbody.applyForce(gravity );
            else{
              phisicalbody.velocity.y=-phisicalbody.velocity.y
            }
            
            pressure   = P0*Math.exp(-g*M*Math.floor(phisicalbody.position.y)/(R*temp))
            pressure_D = P0 - ((airResist/((wings_area + body_area)*6894.757))+pressure); 
            density=6894.757*pressure*M/(R*temp);
            
            displayData()
         }

         function displayData(){
            pressureElement.innerHTML =pressure;
            densityElement.innerHTML =density
            highElemnt.innerHTML =parseInt(phisicalbody.position.y);
            speedElement.innerHTML =Math.floor(0.5+(3600*phisicalbody.velocity.length()/1000));
            AirResistenceElemnt.innerHTML=parseInt(airResist);
            floating_forceElemnt.innerHTML=parseInt(FloatingForce.y);
            P_horizonElement.innerHTML = plane_horizon;
            if(FloatingForce.y>((mass*g)-100) && FloatingForce.y<((mass*g)+100)){
              floating_forceElemnt.style.backgroundColor = 'darkgreen';
            }
            if (FloatingForce.y>((mass*g)+100)){
              floating_forceElemnt.style.backgroundColor = 'yellow';
            }
            if(pressure_D >= 8 ){
              pressure_DElemnt.style.backgroundColor='red';
              warning.play();
            }
            else
            {warning.pause();}
            if(pressure_D >= 9.5 ){
              warning.pause();
              pressure_DElemnt.style.backgroundColor='red';
              hazard.play();
            }
            pressure_DElemnt.innerHTML=pressure_D
         }

         function planeSound(){
          const distance = camera.position.distanceTo( OBJmodel.position );
          if(distance>Maxdistance)
          sound.setVolume( 0 );
          else
          sound.setVolume((1 - distance / Maxdistance)*normal_valume );
         }

         // rendering the scene
   
         
         function animate(){
            if(status)
            requestAnimationFrame(animate)

            applyChanges()
           
            phisicalbody.update(1/60);
            OBJmodel.position.x=(phisicalbody.position.x)
            OBJmodel.position.y=(phisicalbody.position.y)
            OBJmodel.position.z=(phisicalbody.position.z)
            OBJmodel.quaternion.copy(phisicalbody.quaternion)

            planeSound();

            controls.update();
            renderer.render(scene, camera)
         } 
         animate()

      