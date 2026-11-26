import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";

const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
const WALLET = new PublicKey("B2M6bVA2Ak5XGuvhRsd1BR1FN8SZRcjfzECiFWxgVcMx");
const PROGRAM_ID = new PublicKey("11111111111111111111111111111111");

const [vaultPda] = PublicKey.findProgramAddressSync(
  [Buffer.from("vault"), WALLET.toBuffer()],
  PROGRAM_ID
);

const solBalance = await connection.getBalance(WALLET);
const vaultInfo = await connection.getAccountInfo(vaultPda);

console.log({
  cluster: "devnet",
  wallet: WALLET.toBase58(),
  solBalanceSol: solBalance / 1e9,
  vaultPda: vaultPda.toBase58(),
  vaultInitialized: Boolean(vaultInfo),
  vaultDataLength: vaultInfo ? vaultInfo.data.length : 0,
});
