// Rain
//
// That class represents a rainy day.
// It is tiny square that fall down and reappear
// by mean of a HandleWrapping function.

class Rain extends TimeFrames {

  // constructor
  //
  // Set the initial values for the Rain properties
  // Either sets default values or uses the arguments provided
  constructor(x, color) {
    //Position and Display properties
    super(x, color);
    this.x = x;
    this.color = color;
  }

  // background
  //
  // Size and shape of the background object
  background() {
    super.box();
  }

  // backgroudTranslation
  //
  // the background moves to the left at a slow pace
  backgroudTranslation() {
    super.boxTranslation();
  }

}