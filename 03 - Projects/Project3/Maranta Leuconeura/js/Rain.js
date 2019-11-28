// Rain
//
// That class represents a rainy day.
// It is tiny square that fall down and reappear
// by mean of a HandleWrapping function.

class Rain {

  // constructor
  //
  // Set the initial values for the Rain properties
  // Either sets default values or uses the arguments provided
  constructor(x, y, width, height, startTime) {
    //Position
    this.x = x;
    this.y = y;
    //Display properties
    this.width = width;
    this.height = height;
  }

}