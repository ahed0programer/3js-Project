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
const air_vElement =  document.getElementById("air_v");

// elements on the display port

const xElement =document.getElementById("x");
const yElement =document.getElementById("y");
const zElement =document.getElementById("z");
const angular_vElement =document.getElementById("angular_v");

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

var temp=TemparetureElemnt.value ; var P0 = 14.6959*R_pressureElemnt.value ;
var wings_area =2*M_W_areaElemnt.value; var body_area=body_AreaElemnt.value;
var LR_W_area=LR_W_areaAElemnt.value; var LR_Distance= LR_DistanceAElemnt.value;
var mass = massElement.value;
var CDn = CDnElement.value;
var M_W_angle = (M_W_angleElement.value * Math.PI)/180;
var plane_bottom_area =plane_bottom_areaElemnt.value;
var Rare_W_area = Rare_W_areaElemnt.value;
var Rare_W_Distance = Rare_W_DistanceElemnt.value;
var air_v = (air_vElement.value*1000)/3600;

// here they are the forces victors used in Ahed's phisics class 
// those are used to apply forces on the phisics object body (from civil plane's expeirance)
// ..........
const gravity  = new THREE.Vector3(0,-mass*9.82,0);
const engineForce   = new THREE.Vector3(1,0,0);
const AirResistence = new THREE.Vector3(1,0,0);
const Y_AirResistence = new THREE.Vector3(0,1,0);
const FloatingForce = new THREE.Vector3(0,1,0);
const airfoilForce = new THREE.Vector3(0,1,0);

// 
var L_wing_Angle =0 ;        //
var R_wing_Angle =0 ;        //
var Rare_wing_Angle=0;       //
var plane_horizon=0 ;        // the horizon of the plane  
var density=P0*M/(R*temp);   // the density of th air on a high level altitude 
var enginepower=0;           // represent the power of the engine used in the plane
var pressure_D=0;            // represent the pressure differance betwen inside and outside the plane
var time = 0;                // this variable is used to emulate wind blowing ; generating random air forces
var v_fromforce=0
//  var modelrotation=0;


var phisicalbody = new PhisicalOBJ(mass , new THREE.Vector3(-2000,0,0) )
//phisicalbody.quaternion = OBJmodel.quaternion;
let rotationSpeed = Math.PI/80;
// Add event listener for keydown events
document.addEventListener('keydown', function (event) {
  switch (event.key) {

    case "ArrowLeft": // left arrow
      // Rotate model around Y axis in clockwise direction
      if(Rare_wing_Angle>-Math.PI/4)
      Rare_wing_Angle -= rotationSpeed;
      break;

    case "ArrowUp": // up arrow
      // Move model along positive Z axis
      enginepower +=50;
      EngineForceElement.innerHTML = enginepower ;
      break;

    case "ArrowRight": // right arrow
      // Rotate model around Y axis in counter-clockwise direction
      if(Rare_wing_Angle<Math.PI/4)
      Rare_wing_Angle += rotationSpeed;
      break;

    case "ArrowDown": // down arrow
      // Move model along negative Z axis
      if(!enginepower<50)
      enginepower-=50;
      EngineForceElement.innerHTML = enginepower ;
      break;

    case "2": 
      // decrease the left and right wings angle
      // it will decrase the flying force 
      if((L_wing_Angle > -Math.PI/4 || R_wing_Angle > -Math.PI/4) && L_wing_Angle==R_wing_Angle){
        L_wing_Angle-=Math.PI/40;
        R_wing_Angle-=Math.PI/40;
      }
      L_wing_AElemnt.innerHTML =parseInt((180*L_wing_Angle)/Math.PI);
      R_wing_AElemnt.innerHTML =parseInt((180*R_wing_Angle)/Math.PI) ;
      console.log("dsssss")
      break;

    case "8": 
      // increase the left and right wings angle
      // it will increase the flying force 
      if((L_wing_Angle < Math.PI/4 || R_wing_Angle < Math.PI/4 ) && L_wing_Angle==R_wing_Angle){
      L_wing_Angle+=Math.PI/40;
      R_wing_Angle+=Math.PI/40;
      }
      L_wing_AElemnt.innerHTML =parseInt((180*L_wing_Angle)/Math.PI) ;
      R_wing_AElemnt.innerHTML =parseInt((180*R_wing_Angle)/Math.PI) ;
      break;

    case "4": 
      // decrease the left wing angle and increase the right 
      // changes the plane's path to the left  
      if(L_wing_Angle > -Math.PI/4 || R_wing_Angle < Math.PI/4){
      L_wing_Angle-=Math.PI/40;
      R_wing_Angle+=Math.PI/40;
      R_wing_AElemnt.innerHTML =parseInt((180*R_wing_Angle)/Math.PI);
      L_wing_AElemnt.innerHTML =parseInt((180*L_wing_Angle)/Math.PI);
      break;
      }

    case "6": 
      // increase the left wing angle and decrease the right one
      // changes the plane's path to the right  
      if(L_wing_Angle < Math.PI/4 || R_wing_Angle > -Math.PI/4){
      L_wing_Angle+=Math.PI/40;
      R_wing_Angle-=Math.PI/40;
      R_wing_AElemnt.innerHTML =parseInt((180*R_wing_Angle)/Math.PI);
      L_wing_AElemnt.innerHTML =parseInt((180*L_wing_Angle)/Math.PI);
      break;
      }
  }

});

// control interface buttons 

const startElement = document.getElementById("start");
const pauseElement = document.getElementById("pause");

let status = false;
startElement.addEventListener('click',function(){

  temp=TemparetureElemnt.value ;  P0 = 14.6959*R_pressureElemnt.value ;
  wings_area =2*M_W_areaElemnt.value;  body_area=body_AreaElemnt.value;
  LR_W_area=LR_W_areaAElemnt.value;  LR_Distance= LR_DistanceAElemnt.value;
  mass = massElement.value;
  CDn = CDnElement.value;
  M_W_angle = (M_W_angleElement.value * Math.PI)/180;
  plane_bottom_area =plane_bottom_areaElemnt.value;
  Rare_W_area = Rare_W_areaElemnt.value;
  Rare_W_Distance = Rare_W_DistanceElemnt.value;
  air_v = (air_vElement.value*1000)/3600;

  phisicalbody.mass = mass;
 
  status=true
  sound.play();
  warning.play();
  warning.pause();

  animate()
})

pauseElement.addEventListener('click',function(){
  sound.stop()
  warning.stop();
  //stopSound()
  status=false
})


function transformVector(vector) {
  let x=1,y=1,z=1;
  if(vector.x<0) x=-1;
  if(vector.y<0) y=-1;
  if(vector.z<0) z=-1;

  let absX = (x*vector.x) , absY = (y*vector.y) , absZ = (z*vector.z);
  // Calculate x
  if((absX + absY + absZ)!=0)
    var A = 1 / (absX + absY + absZ);
  else 
    return new THREE.Vector3(0,0,0);

  // Transform vector components
  var x1 = vector.x * A;
  var y1 = vector.y * A;
  var z1 = vector.z * A;

  // Create and return the transformed vector
  var transformedVector = new THREE.Vector3(x1, y1, z1);
  return transformedVector;
}

function applyChanges(){
  console.log(phisicalbody.mass);
  //let v  = phisicalbody.velocity.length();
  let vxz  = Math.sqrt(phisicalbody.velocity.x*phisicalbody.velocity.x + phisicalbody.velocity.z*phisicalbody.velocity.z);
  let vy = phisicalbody.velocity.y;

  airResistonwings =0.5*vxz*vxz*density*wings_area*Math.sin(M_W_angle)*CDn*Math.abs(Math.cos(phisicalbody.angle_v_quaternion));
  airResistfromside=0.5*vxz*vxz*density*(plane_bottom_area+wings_area*Math.cos(M_W_angle)*Math.abs(Math.sin(phisicalbody.horizon)))*Math.abs(Math.sin(phisicalbody.angle_v_quaternion))
  airResist      =(airResistfromside + airResistonwings)

  floatingF       = airResistonwings*Math.cos(M_W_angle);
  Y_airResist     = -Math.sign(vy)*0.5*vy*vy*density*(wings_area*Math.cos(M_W_angle)*Math.abs(Math.cos(phisicalbody.horizon))+plane_bottom_area)

  airfoil =Math.sign((air_v-vy))*0.2*(air_v-vy)*(air_v-vy)*density*(wings_area+plane_bottom_area)*(Math.random()*Math.sin(time)*Math.floor(time/2));
  time+=(1/240)
  if(time>=Math.PI)
  time = 0;

  // those are path control Unit 
  // those are the wings that controls the plane path (two-side wings and rare wing)
  // the rare wing is responsible about tha plane's rotation 
  // the two-side wings are responsible about moving the plane (left-right) without rotaion
  LW_Resist   = 0.5*vxz*vxz*density*LR_W_area*Math.sin(L_wing_Angle);
  RW_Resist   = 0.5*vxz*vxz*density*LR_W_area*Math.sin(R_wing_Angle);
  Rare_Resist = 0.5*vxz*vxz*density*Rare_W_area*Math.sin(Rare_wing_Angle);
   

  // applying forces on the body after transforming them from world space to model's space( body's space)
  // ..........
  var Vv = new THREE.Vector3(phisicalbody.velocity.x,0,phisicalbody.velocity.z);
  
  phisicalbody.applyForce(engineForce.clone().applyQuaternion(phisicalbody.quaternion).multiplyScalar(enginepower));
  phisicalbody.applyForce(transformVector(Vv).multiplyScalar(-1).applyQuaternion(phisicalbody.quaternion).multiplyScalar(airResist));
  phisicalbody.applyForce(FloatingForce.clone().applyQuaternion(phisicalbody.quaternion).multiplyScalar(floatingF));


  
  phisicalbody.applyForce(Y_AirResistence.clone().multiplyScalar(Y_airResist));
  phisicalbody.applyForce(new THREE.Vector3(0,0,Rare_Resist).applyQuaternion(phisicalbody.quaternion),new THREE.Vector3(Rare_W_Distance,0,0).applyQuaternion(phisicalbody.quaternion));
  phisicalbody.applyForce(new THREE.Vector3(0,airfoil,0),undefined, new THREE.Vector4(Mountmodel.position.x+2000 ,Mountmodel.position.y , Mountmodel.position.z,500));
  

  torqueResist = phisicalbody.angularVelocity.length()
  torqueResist =-torqueResist*torqueResist*100
  if( Math.abs((torqueResist*LR_Distance)/phisicalbody.mass)<0.05 & Math.abs(((LR_Distance/2)*RW_Resist)/phisicalbody.mass)<0.05 & Math.abs(((LR_Distance/2)*LW_Resist)/phisicalbody.mass)<0.05)
  phisicalbody.angularVelocity.set(0,0,0);

  if(phisicalbody.position.y > 1){
    phisicalbody.applyForce(new THREE.Vector3(0,1,0).multiplyScalar(RW_Resist)   ,new THREE.Vector3(0,0,LR_Distance/2).applyQuaternion(phisicalbody.quaternion));
    phisicalbody.applyForce(new THREE.Vector3(0,1,0).multiplyScalar(LW_Resist)   ,new THREE.Vector3(0,0,-LR_Distance/2).applyQuaternion(phisicalbody.quaternion));
    phisicalbody.applyForce(new THREE.Vector3(0,1,0).multiplyScalar(torqueResist),new THREE.Vector3(0,0,-LR_Distance/2).applyQuaternion(phisicalbody.quaternion));
    }
  else if(phisicalbody.horizon>0.1)
   status=false;
  

  phisicalbody.applyForce(Y_AirResistence.clone().multiplyScalar(Y_airResist));

    if(phisicalbody.position.y>0.2)
      phisicalbody.applyForce(gravity);
    else{
      if(phisicalbody.velocity.y<2)
      phisicalbody.velocity.y=0
      else
      phisicalbody.velocity.y=-phisicalbody.velocity.y/1.4
    }
  
    pressure   = P0*Math.exp(-g*M*Math.floor(phisicalbody.position.y)/(R*temp))
    pressure_D = P0 - ((airResist/((wings_area + body_area)*6894.757))+pressure);
    density =6894.757*pressure*M/(R*temp);
    
    displayData()
  }

var canv = document.getElementById("derictionCanvas");
var ctx = canv.getContext("2d");
function draw_deriction() {
  // clear the canvas
  ctx.clearRect(0, 0, canv.width, canv.height);

  // calculate new position of the line
  var newX = 50 - 50*Math.sin(phisicalbody.deriction);
  var newY = 70 - 50*Math.cos(phisicalbody.deriction);

  // draw the line with the new position
  ctx.beginPath();
  ctx.moveTo(50, 70);
  ctx.lineTo(newX, newY);
  ctx.strokeStyle = "yellow";
  ctx.stroke();

  // draw other elements
  ctx.beginPath();
  ctx.arc(50, 70, 50, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.font = "15px bold";
  ctx.fillStyle = "yellow"
  ctx.fillText("N", 45, 15); 
}

function displayData(){
  draw_deriction(draw_deriction())
  pressureElement.innerHTML =(pressure+" ").substring(0,8);
  densityElement.innerHTML =(density+" ").substring(0,8)
  highElemnt.innerHTML =parseInt(phisicalbody.position.y);
  speedElement.innerHTML =Math.floor(0.5+(3600*phisicalbody.velocity.length()/1000));
  AirResistenceElemnt.innerHTML=parseInt(airResist);
  floating_forceElemnt.innerHTML=parseInt(floatingF);
  P_horizonElement.innerHTML = Math.floor((phisicalbody.horizon*180)/Math.PI);
  rare_w_angleElemnt.innerHTML = (Rare_wing_Angle*180)/Math.PI;
  angular_vElement.innerHTML = "Angular v : "+phisicalbody.angularVelocity.x;
  if(floatingF>((mass*g)-100) && floatingF<((mass*g)+100)){
    floating_forceElemnt.style.backgroundColor = 'darkgreen';
  }
  if (floatingF>((mass*g)+100)){
    floating_forceElemnt.style.backgroundColor = '#661504';
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
  pressure_DElemnt.innerHTML=(pressure_D+" ").substring(0,8)

  // data on the display port 
  xElement.innerHTML = "x :  "+phisicalbody.angle_v_quaternion+" "+ parseInt(phisicalbody.position.x)
  yElement.innerHTML = "y : "+ parseInt(phisicalbody.position.y)
  zElement.innerHTML = "z : "+ parseInt(phisicalbody.position.z)
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
  OBJmodel.position.copy(phisicalbody.position)
  OBJmodel.quaternion.copy(phisicalbody.quaternion)

  planeSound();

  controls.update();
  renderer.render(scene, camera)
} 
animate()

    