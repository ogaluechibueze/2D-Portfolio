import makeIcon from "../components/Icon";
import { opacityTrickleDown } from "../utils";

export default function makeSkillIcon(k, parent, posVec2, imageData, subtitle) {
  const [icon, subtitleText] = makeIcon(
    k,
    parent,
    posVec2,
    imageData,
    subtitle
  );

  icon.use(
    k.area({ shape: new k.Rect(k.vec2(0), icon.width + 50, icon.height + 65) })
  );
  icon.use(k.body({ drag: 1 }));
  icon.use({ direction: k.vec2(0, 0) });

  icon.onCollide("player", (player) => {
    icon.applyImpulse(player.direction.scale(1000));
    icon.direction = player.direction;
  });

  opacityTrickleDown(parent, [subtitleText]);

  return icon;
}
