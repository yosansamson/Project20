function do_something(this_sprite) {
}

function moving_west(this_sprite) {
  moveInDirection(this_sprite, 5, "West");
}

function spinning_right(this_sprite) {
  turn(this_sprite, 6, "right");
}

function growing(this_sprite) {
  changePropBy(this_sprite, "scale", 1);
}

function swimming_left_and_right(this_sprite) {
  if (getProp(this_sprite, "direction") == 0) {
    mirrorSprite(this_sprite, "right");
  } else if (getProp(this_sprite, "direction") == 180) {
    mirrorSprite(this_sprite, "left");
  }
  moveForward(this_sprite, 5);
  if (isTouchingEdges(this_sprite)) {
    edgesDisplace(this_sprite);
    changePropBy(this_sprite, "direction", 180);
  }
}

function moving_east(this_sprite) {
  moveInDirection(this_sprite, 5, "East");
}

function moving_north(this_sprite) {
  moveInDirection(this_sprite, 5, "North");
}

function patrolling(this_sprite) {
  moveForward(this_sprite, 5);
  if (isTouchingEdges(this_sprite)) {
    edgesDisplace(this_sprite);
    changePropBy(this_sprite, "direction", 180);
  }
}

function moving_south(this_sprite) {
  moveInDirection(this_sprite, 5, "South");
}

function math_random_int(a, b) {
  if (a > b) {
    // Swap a and b to ensure a is smaller.
    var c = a;
    a = b;
    b = c;
  }
  return Math.floor(Math.random() * (b - a + 1) + a);
}

function jittering(this_sprite) {
  changePropBy(this_sprite, "scale", math_random_int(-1, 1));
}

function wandering(this_sprite) {
  if (math_random_int(0, 5) == 0) {
    changePropBy(this_sprite, "direction", math_random_int(-25, 25));
  }
  moveForward(this_sprite, 1);
  if (isTouchingEdges(this_sprite)) {
    edgesDisplace(this_sprite);
    changePropBy(this_sprite, "direction", math_random_int(135, 225));
  }
}

function shrinking(this_sprite) {
  changePropBy(this_sprite, "scale", -1);
}

function spinning_left(this_sprite) {
  turn(this_sprite, 6, "left");
}

function moving_with_arrow_keys(this_sprite) {
  if (isKeyPressed("up")) {
    moveInDirection(this_sprite, 5, "North");
  }
  if (isKeyPressed("down")) {
    moveInDirection(this_sprite, 5, "South");
  }
  if (isKeyPressed("left")) {
    moveInDirection(this_sprite, 5, "West");
  }
  if (isKeyPressed("right")) {
    moveInDirection(this_sprite, 5, "East");
  }
}

function driving_with_arrow_keys(this_sprite) {
  if (isKeyPressed("up")) {
    moveForward(this_sprite, 5);
  }
  if (isKeyPressed("down")) {
    moveBackward(this_sprite, 5);
  }
  if (isKeyPressed("left")) {
    changePropBy(this_sprite, "direction", -5);
    changePropBy(this_sprite, "rotation", -5);
  }
  if (isKeyPressed("right")) {
    changePropBy(this_sprite, "direction", 5);
    changePropBy(this_sprite, "rotation", 5);
  }
  if (isTouchingEdges(this_sprite)) {
    edgesDisplace(this_sprite);
  }
}

function fluttering(this_sprite) {
  changePropBy(this_sprite, "y", math_random_int(-1, 1));
}

function wobbling(this_sprite) {
  withPercentChance(50, function () {
    setProp(this_sprite, "rotation", math_random_int(-1, 1));
  });
}

setBackground('#33ff33');
makeNewSpriteAnon("mouse", ({"x":178,"y":363}));
makeNewSpriteAnon("brown_cat_2", ({"x":371,"y":125}));
makeNewSpriteAnon("brown_cat_2", ({"x":40,"y":272}));
makeNewSpriteAnon("animation_2_1", ({"x":184,"y":72}));
addBehaviorSimple(({costume: "brown_cat_2"}), new Behavior(swimming_left_and_right, []));

keyPressed("when", "up", function () {
  moveInDirection(({costume: "mouse"}), 21, "North");
});

keyPressed("when", "right", function () {
  moveInDirection(({costume: "mouse"}), 21, "East");
});

keyPressed("when", "left", function () {
  moveInDirection(({costume: "mouse"}), 21, "West");
});

keyPressed("when", "down", function () {
  moveInDirection(({costume: "mouse"}), 21, "South");
});

checkTouching("when", ({costume: "mouse"}), ({costume: "animation_2_1"}), function (extraArgs) {
  showTitleScreen('you', 'win');
  playSound('sound://category_achievements/sharp_win_3.mp3');
});

checkTouching("when", ({costume: "mouse"}), ({costume: "brown_cat_2"}), function (extraArgs) {
  showTitleScreen('you', 'lose');
  addBehaviorSimple(({costume: "mouse"}), new Behavior(moving_south, []));
});

