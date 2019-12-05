// Leaves
//
// That class represents a leaves growing up.
// It illustrates the concept of a plant.

class Leaves {

  // constructor
  //
  // Set the initial values for the Leaves properties
  // Either sets default values or use the arguments provided
  constructor(x, y, width, height, angle, avatar, growingRate, maxHeight) {
    // Position properties
    this.x = x;
    this.y = y;
    // Display property
    this.width = width;
    this.height = height;
    this.theta = angle;
    this.avatar = avatar;
    // Growing properties
    this.heightGrowingRate = growingRate;
    this.widthGrowingRate = this.heightGrowingRate / 2;
    this.maxHeight = maxHeight;
  }

  // display
  //
  // Display the leaf as an image
  display() {
    push();
    imageMode(CENTER);
    // translate(this.x, this.y);
    // rotate(this.theta);
    image(this.avatar, this.x, this.y, this.width, this.height);
    pop();
  }

  // grow
  //
  // Enlarge the plant on both axis
  grow() {
    if (this.height < this.maxHeight) {
      this.width += this.widthGrowingRate;
      this.height += this.heightGrowingRate;
    }
  }
}