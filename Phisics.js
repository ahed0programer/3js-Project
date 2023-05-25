
class PhisicalOBJ {
  constructor(mass, position, velocity) {
    this.mass = mass;
    this.position = position || new THREE.Vector3();
    this.velocity = velocity || new THREE.Vector3();
    this.acceleration = new THREE.Vector3();
    this.quaternion = new THREE.Quaternion(); // add quaternion property
    this.angularVelocity = new THREE.Vector3(); // add angular velocity property
    this.angularAcceleration = new THREE.Vector3(); // add angular acceleration property
  }

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
    let f ;
    if(this.check_IN_theposition(inPosition)){
      f = force.clone().divideScalar(this.mass);
      this.acceleration.add(f);
    }
    
    if (relativePosition) {
      const torque = relativePosition.clone().cross(f);
      this.applyTorque(torque);
    }
  }

  applyTorque(torque) {
    this.angularAcceleration.add(torque.divideScalar(this.mass));
  }

  update(dt) {
    // Update velocity based on acceleration
    this.velocity.add(this.acceleration.clone().multiplyScalar(dt));

    // Update position based on velocity
    this.position.add(this.velocity.clone().multiplyScalar(dt));

    // Clear acceleration for next frame
    this.acceleration.set(0, 0, 0);

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