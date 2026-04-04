const items = [
  { name: "sword", price: 1000 },
  { name: "shield", price: 800 }
];

module.exports = {
  name: "shop",
  execute(message) {
    const list = items.map(i => `${i.name} - ${i.price}`).join("\n");
    message.reply(`Shop:\n${list}`);
  }
};
