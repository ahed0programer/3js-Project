
// class PhisicalOBJ  {
//   constructor(mass, position, velocity) {
//     this.mass = mass;
//     this.position = position || new THREE.Vector3();
//     this.velocity = velocity || new THREE.Vector3();
//     this.acceleration = new THREE.Vector3();
//   }

//   applyForce(force) {
//     const f = force.clone().divideScalar(this.mass);
//     this.acceleration.add(f);
//   }

//   update(dt) {
//     // Update velocity based on acceleration
//     this.velocity.add(this.acceleration.clone().multiplyScalar(dt));

//     // Update position based on velocity
//     this.position.add(this.velocity.clone().multiplyScalar(dt));

//     // Clear acceleration for next frame
//     this.acceleration.set(0, 0, 0);
//   }
// }

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

  applyForce(force, relativePosition  ) {
    const f = force.clone().divideScalar(this.mass);
    this.acceleration.add(f);

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