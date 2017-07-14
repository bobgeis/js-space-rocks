
// import { CANVAS } from '../constants';
import * as player from './player-canvas';
import * as base from './base-canvas';

export const img = {};

let thingsToLoad = 0;
let thingsLoaded = 0;

export const loadingFinished = () => {
  return thingsLoaded === thingsToLoad && thingsLoaded !== 0;
};

export const loadAllImages = () => {
  img.bg = loadImageFile('./res/img/starsSmall.jpg', 0);  // is this necessary?
  img.player = player.loadImage();
  img.baseGuild = base.loadImageGuild();
  img.baseMed = base.loadImageMed();
};

export const loadImageFile = (source, rotation=Math.PI/2, width, height) => {
  thingsToLoad++;
  const img = new Image();
  img.src = source;
  const ctx = document.createElement("canvas").getContext('2d');
  img.onload = () => {
    ctx.canvas.width = width ? width : img.width;
    ctx.canvas.height = height ? height : img.height;
    ctx.save();
    ctx.translate(img.width/2, img.height/2);
    ctx.rotate(rotation);
    if (width && height) {
      ctx.drawImage(img, -img.width/2, -img.height/2, width, height);
    } else {
      ctx.drawImage(img, -img.width/2, -img.height/2);
    }
    ctx.restore();
    thingsLoaded++;
  };
  return ctx;
};

export const draw = (ctx, img, x, y, a=0) => {
  const canvas = img.canvas;
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(-a);
  ctx.drawImage(
    canvas,
    -Math.floor(canvas.width/2),
    -Math.floor(canvas.height/2)
  );
  ctx.restore();
};
