import db from "../index";
import bycrpt from "bcrypt"
async function main() {
  const doma = await db.user.upsert({
    where: {
      phoneNumber: "9999999999",
    },
    update: {},
    create: {
      name: "Doma",
      phoneNumber: "9999999999",
      email: "doma@killer.com",
      password: await bycrpt.hash("doma123", 10),
      Balances: {
        create:{
          amount: 20000,
          locked: 0,

        }
      },
      OnRampTransactions: {
        create: {
          startTime: new Date(),
          amount: 20000,
          provider: "HDFC BANK",
          status: "Success",
          token: "token_1",
        },
      },
    },
  });

  const muzan = await db.user.upsert({
    where: {
      phoneNumber: "9999900000",
    },
    update: {},
    create: {
      name: "Muzan",
      phoneNumber: "9999900000",
      email: "muzan@google.com",
      password: await bycrpt.hash("muzan456" ,10),
      Balances: {
        create:{
          amount: 4000,
          locked: 0
        }
      },
      OnRampTransactions: {
        create: {
          startTime: new Date(),
          amount: 2000,
          provider: "AXIX BANK",
          status: "Failed",
          token: "token_2",
        },
      },
    },
  });
  // console.log({doma,muzan});
}




main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.log(e);
    await db.$disconnect();
    process.exit(1);
  });
