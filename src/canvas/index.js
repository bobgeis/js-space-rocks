
// given a game state and a canvas context, draw onto the canvas everthing that belongs there


export const renderCanvas = (ctx, state) => {
  // things drawn onto a canvas will cover anything already drawn
  renderBg(ctx);
  renderBases(ctx);
  renderLoot(ctx);
  renderBullets(ctx);
  renderRocks(ctx);
  renderShips(ctx);
  renderPlayer(ctx);
  renderBooms(ctx);
};

const renderBg = (ctx) => {
  // ctx.fillStyle = "#000000";
  // ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
};

const renderBases = (ctx) => {
  return;
};

const renderLoot = (ctx) => {
  return;
};

const renderBullets = (ctx) => {
  return;
};

const renderRocks = (ctx) => {
  return;
};

const renderShips = (ctx) => {
  return;
};

const renderPlayer = (ctx) => {
  ctx.drawImage(playerImg.canvas, 200, 200);
  return;
};

const renderBooms = (ctx) => {
  return;
};

const loadImage = (source) => {
  const img = new Image();
  img.src = source;
  const ctx = document.createElement("canvas").getContext('2d');
  console.log(img);
  img.onload = () => {
    console.log(img);
    // const ctx = document.createElement("canvas").getContext('2d');
    ctx.canvas.width = img.width;
    ctx.canvas.height = img.height;
    ctx.save();
    ctx.translate(img.width/2, img.height/2);
    ctx.drawImage(img, -img.width/2, -img.height/2);
    ctx.restore();
  };
  // when on load gets called, the context will have the image drawn to it
  return ctx;
};

const playerImg = loadImage('./res/img/player.png');

export const loadAllImages = () => {
  const playerImg = loadImage('./res/img/player.png');
};
