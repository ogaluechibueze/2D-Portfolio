import { DIAGONAL_FACTOR } from "../constants";
import {
  isEmailModalVisibleAtom,
  isProjectModalVisibleAtom,
  isSocialModalVisibleAtom,
  store,
} from "../store";

export default function makePlayer(k, posVec2, speed) {
  const player = k.add([
    k.sprite("player", { anim: "walk-down" }),
    k.scale(8),
    k.anchor("center"),
    k.area({ shape: new k.Rect(k.vec2(0), 5, 10) }),
    k.body(),
    k.pos(posVec2),
    "player",
    {
      direction: k.vec2(0, 0),
      directionName: "walk-down",
    },
  ]);

  let isMouseDown = false;
  const game = document.getElementById("game");
  game.addEventListener("focusout", () => {
    isMouseDown = false;
  });
  game.addEventListener("mousedown", () => {
    isMouseDown = true;
  });

  game.addEventListener("mouseup", () => {
    isMouseDown = false;
  });

  game.addEventListener("touchstart", () => {
    isMouseDown = true;
  });

  game.addEventListener("touchend", () => {
    isMouseDown = false;
  });

  player.onUpdate(() => {
    if (!k.camPos().eq(player.pos)) {
      k.tween(
        k.camPos(),
        player.pos,
        0.2,
        (newPos) => k.camPos(newPos),
        k.easings.linear
      );
    }

    if (
      store.get(isSocialModalVisibleAtom) ||
      store.get(isEmailModalVisibleAtom) ||
      store.get(isProjectModalVisibleAtom)
    )
      return;

    player.direction = k.vec2(0, 0);
    const worldMousePos = k.toWorld(k.mousePos());

    if (isMouseDown) {
      player.direction = worldMousePos.sub(player.pos).unit();
    }

    if (
      player.direction.eq(k.vec2(0, 0)) &&
      !player.getCurAnim().name.includes("idle")
    ) {
      player.play(`${player.directionName}-idle`);
      return;
    }

    if (
      player.direction.x > 0 &&
      player.direction.y > -0.5 &&
      player.direction.y < 0.5
    ) {
      player.directionName = "walk-right";
    }

    if (
      player.direction.x < 0 &&
      player.direction.y > -0.5 &&
      player.direction.y < 0.5
    )
      player.directionName = "walk-left";

    if (player.direction.x < 0 && player.direction.y < -0.8)
      player.directionName = "walk-up";

    if (player.direction.x < 0 && player.direction.y > 0.8)
      player.directionName = "walk-down";

    if (
      player.direction.x < 0 &&
      player.direction.y > -0.8 &&
      player.direction.y < -0.5
    )
      player.directionName = "walk-left-up";

    if (
      player.direction.x < 0 &&
      player.direction.y > 0.5 &&
      player.direction.y < 0.8
    )
      player.directionName = "walk-left-down";

    if (
      player.direction.x > 0 &&
      player.direction.y < -0.5 &&
      player.direction.y > -0.8
    )
      player.directionName = "walk-right-up";

    if (
      player.direction.x > 0 &&
      player.direction.y > 0.5 &&
      player.direction.y < 0.8
    )
      player.directionName = "walk-right-down";

    if (player.getCurAnim().name !== player.directionName) {
      player.play(player.directionName);
    }

    if (player.direction.x && player.direction.y) {
      player.move(player.direction.scale(DIAGONAL_FACTOR * speed));
      return;
    }

    player.move(player.direction.scale(speed));
  });

  return player;
}
