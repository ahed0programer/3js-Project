
class PhisicalOBJ {
  constructor(mass, position, velocity) {
    this.mass = mass;
    this.position = position || new THREE.Vector3();
    this.velocity = velocity || new THREE.Vector3();
    this.acceleration = new THREE.Vector3();
    this.quaternion = new THREE.Quaternion(); // add quaternion property
    this.angularVelocity = new THREE.Vector3(); // add angular velocity property
    this.angularAcceleration = new THREE.Vector3(); // add angular acceleration property
    this.horizon=0;
    this.deriction=0;
    this.angle_v_quaternion=0
  }

  // checking the if the model is in the region of the force 
  // note the you can pass 0 for any x,y,z to make the feild infinity on the passed axis
  check_IN_theposition(inPosition){
    let checkx=false;
    let checkz=false;
    let checky=false;
    if((this.position.x <inPosition.x+inPosition.w && this.position.x >inPosition.x-inPosition.w)||inPosition.x==0)
      checkx=true;
    if((this.position.z <inPosition.z+inPosition.w && this.position.z >inPosition.z-inPosition.w)||inPosition.z==0)
      checkz=true;
    if((this.position.y <inPosition.y+inPosition.w && this.position.y <inPosition.y-inPosition.w)||inPosition.y==0)
      checky=true;
    
    return (checkx && checkz && checky);
    
  }

  applyForce(force, relativePosition , inPosition=new THREE.Vector4(0,0,0,Infinity)) {
    var f ;
    if(this.check_IN_theposition(inPosition)){
      f = force.clone().divideScalar(this.mass);
      this.acceleration.add(f);
    }
    
    if (relativePosition) {
      const torque = relativePosition.clone().cross(f);
      this.applyTorque(torque);
    }

    return f ? f.multiplyScalar(1/60):null;
  }

  applyTorque(torque) {
    this.angularAcceleration.add(torque.divideScalar(this.mass));
  }

  calculate_horizon(){
    // this method calculate the angle between world space's y axis and model's y axis

    const toRotationTransM = new THREE.Matrix4();
    toRotationTransM.makeRotationFromQuaternion(this.quaternion);

    const modelY = new THREE.Vector3(0, 1, 0).applyMatrix4(toRotationTransM);

    const worldY = new THREE.Vector3(0, 1, 0);
    this.horizon = worldY.angleTo(modelY);
  }

  calculate_deriction(){
    // this method calculate the angle between world space's X axis and model's X axis
    const toRotationTransM = new THREE.Matrix4();
    toRotationTransM.makeRotationFromQuaternion(this.quaternion);

    const modelX = new THREE.Vector3(1, 0, 0).applyMatrix4(toRotationTransM);

    const worldX = new THREE.Vector3(1, 0, 0);
    //this.deriction = worldX.angleTo(modelX);
    const crossProduct = worldX.clone().cross(modelX);
    let sign = 1;
    if (crossProduct.y < 0) {
      sign = -1;
    }
  
    this.deriction = sign * worldX.angleTo(modelX);
  
  }

  calculate_teta(){
    // this method calculate the angle between world space's y axis and model's y axis

    const Velocity = new THREE.Vector3(this.velocity.x, 0, this.velocity.z);

    var quaterniondirection = new THREE.Vector3(1,0,0);
    quaterniondirection.applyQuaternion(this.quaternion);
    var derict = new THREE.Vector3(quaterniondirection.x,0,quaterniondirection.z);
    this.angle_v_quaternion = Velocity.angleTo(derict);
  }



  update(dt) {
   
    // Update velocity based on acceleration
    this.velocity.add(this.acceleration.clone().multiplyScalar(dt));

    // Update position based on velocity
    this.position.add(this.velocity.clone().multiplyScalar(dt));

    // Clear acceleration for next frame
    this.acceleration.set(0, 0, 0);

    this.velocity.clone().normalize();

    // Update angular velocity based on angular acceleration
    this.angularVelocity.add(this.angularAcceleration.clone().multiplyScalar(dt));

    // Create a quaternion from the current angular velocity
    const w = this.angularVelocity.length();
    if (w > 0) {
      const axis = this.angularVelocity.clone().normalize();
      const angle = w * dt;
      const q = new THREE.Quaternion().setFromAxisAngle(axis, angle);
      this.quaternion.multiply(q); // Update quaternion by multiplying with the new rotation
    }

    // Clear angular acceleration for next frame
    this.angularAcceleration.set(0, 0, 0);

    this.calculate_horizon();
    this.calculate_deriction();
    this.calculate_teta();
  }
}



// class PhisicalOBJ {
 

//   constructor(mass, postion) {
//     this.mass = mass;
//     this.postion=postion;
//     this.velocity = new velocity(0,0,0);
//   }

//   applyForce(Vec3) {
        
//   }

//   method2() {
//     // Method code here
//   }
// }

// class position{
//     constructor(x,y,z){
//         this.x=x;
//         this.y=y;
//         this.z=z;
//     }
// }

// class velocity{
//     constructor(x,y,z){
//         this.x=x;
//         this.y=y;
//         this.z=z;
//     }
// }