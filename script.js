// import PhisicalOBJ from './Phisics.js'

// Static Factors
const massElement = document.getElementById("mass");
const M_W_angleElement = document.getElementById("M_W_angle");
const M_W_areaElemnt = document.getElementById("M_W_area");
const LR_W_areaAElemnt = document.getElementById("LR_W_area");
const Rare_W_areaElemnt = document.getElementById("Rare_W_area");
const Rare_W_DistanceElemnt = document.getElementById("Rare_W_Distance");
const LR_DistanceAElemnt = document.getElementById("LR_Distance");
const R_pressureElemnt =document.getElementById("R_A_pressure");
const TemparetureElemnt =document.getElementById("Tempareture");
const plane_bottom_areaElemnt = document.getElementById("plane_bottom_area");
const CDnElement =  document.getElementById("CDn");


// Get a reference to the Dynamic Factors
const myElement = document.getElementById("force");
const speedElement = document.getElementById("speed");
const EngineForceElement = document.getElementById("Engineforce");
const AirResistenceElemnt = document.getElementById("AirResistence");
const body_AreaElemnt = document.getElementById("body_AreaElemnt");
const floating_forceElemnt = document.getElementById("floating_force");
const L_wing_AElemnt = document.getElementById("L_wing");
const R_wing_AElemnt = document.getElementById("R_wing");
const rare_w_angleElemnt = document.getElementById("rare_w_angle"); 
const highElemnt = document.getElementById("high");
const pressureElement =document.getElementById("pressure");
const pressure_DElemnt = document.getElementById("pressure_diff");
const P_horizonElement =  document.getElementById("P_horizon");
const densityElement =  document.getElementById("density");


// here they are the parameters coming from the static factors
// ...............
const g=9.81 ;const R=8.31447 ; const M =0.0289644 ;
const temp=TemparetureElemnt.value ; const P0 = 14.6959*R_pressureElemnt.value ;
const wings_area =2*M_W_areaElemnt.value; const body_area=body_AreaElemnt.value;
const LR_W_area=LR_W_areaAElemnt.value; const LR_Distance= LR_DistanceAElemnt.value;
const mass = massElement.value;
const CDn = CDnElement.value;
const M_W_angle = (M_W_angleElement.value * Math.PI)/180;
const plane_bottom_area =plane_bottom_areaElemnt.value;
const Rare_W_area = Rare_W_areaElemnt.value;
const Rare_W_Distance = Rare_W_DistanceElemnt.value;

// here they are the forces victors used in Ahed's phisics class 
// those are used to apply forces on the phisics object body (from civil plane's expeirance)
// ..........
const gravity  = new THREE.Vector3(0,-mass*9.81,0);
const engineForce   = new THREE.Vector3(1,0,0);
const AirResistence = new THREE.Vector3(-1,0,0);
const Y_AirResistence = new THREE.Vector3(0,-1,0);
const FloatingForce = new THREE.Vector3(0,1,0);

// 
var L_wing_Angle =0 ;
var R_wing_Angle =0 ;
var Rare_wing_Angle=0;
var plane_horizon=0 ;
var density=P0*M/(R*temp);
var enginepower=0;
var pressure_D=0;
//  var modelrotation=0;


const phisicalbody = new PhisicalOBJ(mass , new THREE.Vector3(0,0,0) )
//phisicalbody.quaternion = OBJmodel.quaternion;
let rotationSpeed = Math.PI/40;
// Add event listener for keydown events
document.addEventListener('keydown', function (event) {
  switch (event.key) {

    case "ArrowLeft": // left arrow
      // Rotate model around Y axis in clockwise direction
      Rare_wing_Angle -= rotationSpeed;
      
      break;

    case "ArrowUp": // up arrow
      // Move model along positive Z axis
      enginepower +=50;
      EngineForceElement.innerHTML = enginepower ;
      break;

    case "ArrowRight": // right arrow
      // Rotate model around Y axis in counter-clockwise direction
      Rare_wing_Angle += rotationSpeed;
      break;

    case "ArrowDown": // down arrow
      // Move model along negative Z axis
      if(!enginepower<50)
      enginepower-=50;
      EngineForceElement.innerHTML = enginepower ;
      break;

    case "1": 
      // decrease the left and right wings angle
      if(L_wing_Angle > -Math.PI/4 || R_wing_Angle > -Math.PI/4){
        L_wing_Angle-=Math.PI/40;
        R_wing_Angle-=Math.PI/40;
      }
      L_wing_AElemnt.innerHTML =parseInt((180*L_wing_Angle)/Math.PI);
      R_wing_AElemnt.innerHTML =parseInt((180*R_wing_Angle)/Math.PI) ;
      console.log("dsssss")
      break;

    case "7": 
      // increase the left and right wings angle
      if(L_wing_Angle < Math.PI/4 || R_wing_Angle < Math.PI/4){
      L_wing_Angle+=Math.PI/40;
      R_wing_Angle+=Math.PI/40;
      }
      L_wing_AElemnt.innerHTML =parseInt((180*L_wing_Angle)/Math.PI) ;
      R_wing_AElemnt.innerHTML =parseInt((180*R_wing_Angle)/Math.PI) ;
      break;

    case "9": 
      // decrease the left wing angle and increase the right one
      L_wing_Angle-=Math.PI/40;
      R_wing_Angle+=Math.PI/40;
      R_wing_AElemnt.innerHTML =Math.floor((180*R_wing_Angle)/Math.PI);
      L_wing_AElemnt.innerHTML =Math.floor((180*L_wing_Angle)/Math.PI);
      break;

    case "3": 
      // increase the left wing angle and decrease the right one
      L_wing_Angle+=Math.PI/40;
      R_wing_Angle-=Math.PI/40;
      R_wing_AElemnt.innerHTML =Math.floor((180*R_wing_Angle)/Math.PI);
      L_wing_AElemnt.innerHTML =Math.floor((180*L_wing_Angle)/Math.PI);
      break;
  }

});

// control interface buttons 

const startElement = document.getElementById("start");
const pauseElement = document.getElementById("pause");

let status = false;
startElement.addEventListener('click',function(){
  status=true
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

  
function applyChanges(){
  
  //let v  = phisicalbody.velocity.length();
  let vxz  = Math.sqrt(phisicalbody.velocity.x*phisicalbody.velocity.x + phisicalbody.velocity.z*phisicalbody.velocity.z);
  let vy = phisicalbody.velocity.y;

  airResist =0.5*vxz*vxz*density*wings_area*Math.sin(M_W_angle)*CDn;
  floatingF =airResist*Math.cos(M_W_angle);
  Y_airResist =0.5*vy*vy*density*(wings_area*Math.cos(M_W_angle)+plane_bottom_area);

  // those are path control Unit 
  // those are the wings that controls the plane path and two-side wings and rare wing
  // the rare wing is responsible about tha plane's rotation 
  // the two-side wings are responsible abour moving the plane (left -right) without rotaion

  LW_Resist   = 0.5*vxz*vxz*density*LR_W_area*Math.sin(L_wing_Angle);
  RW_Resist   = 0.5*vxz*vxz*density*LR_W_area*Math.sin(R_wing_Angle);
  Rare_Resist = 0.5*vxz*vxz*density*Rare_W_area*Math.sin(Rare_wing_Angle);

  // applying forces on the body after transforming them from world space to model's space( body's space)
  // ..........
  phisicalbody.applyForce(engineForce.clone().applyQuaternion(phisicalbody.quaternion).multiplyScalar(enginepower));
  phisicalbody.applyForce(AirResistence.clone().applyQuaternion(phisicalbody.quaternion).multiplyScalar(airResist) );
  phisicalbody.applyForce(Y_AirResistence.clone().applyQuaternion(phisicalbody.quaternion).multiplyScalar(Y_airResist));
  phisicalbody.applyForce(FloatingForce.clone().applyQuaternion(phisicalbody.quaternion).multiplyScalar(floatingF));
  phisicalbody.applyForce(new THREE.Vector3(0,RW_Resist,0),new THREE.Vector3(0,0,LR_Distance/2));
  phisicalbody.applyForce(new THREE.Vector3(0,LW_Resist,0),new THREE.Vector3(0,0,-LR_Distance/2));
  phisicalbody.applyForce(new THREE.Vector3(0,0,Rare_Resist),new THREE.Vector3(Rare_W_Distance,0,0));

  if(phisicalbody.position.y>0.2)
    phisicalbody.applyForce(gravity);
  else
    phisicalbody.velocity.y=-phisicalbody.velocity.y

  if(phisicalbody.velocity.y>0)
    Y_AirResistence.y=-1;
  else
    Y_AirResistence.y= 1;
  
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
  floating_forceElemnt.innerHTML=parseInt(floatingF);
  P_horizonElement.innerHTML = plane_horizon;
  rare_w_angleElemnt.innerHTML = Rare_wing_Angle;
  if(floatingF>((mass*g)-100) && floatingF<((mass*g)+100)){
    floating_forceElemnt.style.backgroundColor = 'darkgreen';
  }
  if (floatingF>((mass*g)+100)){
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

    