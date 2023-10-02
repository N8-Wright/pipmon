import { Engine } from './engine';
import { Player } from './gobj/player';
import { Color } from './lib/color';
import { Size } from './lib/size';
import { Vec2 } from './lib/vec';

const game = new Engine(new Size(160, 144), new Size(800, 600), 60, new Color(0, 0, 0, 1));

window.addEventListener('load', () => {
    const player = new Player(new Vec2(0, 0));
    game.start(document.body, f => {
        if (game.isKeyDown('a')) {
            player.go('left');
        } else if (game.isKeyDown('d')) {
            player.go('right');
        } else if (game.isKeyDown('w')) {
            player.go('up');
        } else if (game.isKeyDown('s')) {
            player.go('down');
        } else {
            player.go('none');
        }
        return [player];
    }, console.log);
});
