
/api/index.js
export default async function handler(req, res) {
  const lcdUrl = "https://lcd-osmosis.keplr.app";
  const wallet = "osmo1psaaa8z5twqgs4ahgqdxwl86eydmlwhesmv4s9";

  try {
    const [balanceResp, txResp] = await Promise.all([
      fetch(`${lcdUrl}/cosmos/bank/v1beta1/balances/${wallet}`),
      fetch(`${lcdUrl}/cosmos/tx/v1beta1/txs?events=transfer.recipient%3D%27${wallet}%27&order_by=ORDER_BY_DESC&limit=50`)
    ]);

    const balances = await balanceResp.json();
    const transactions = await txResp.json();

    res.status(200).json({ balances, transactions });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
