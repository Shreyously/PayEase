-- CreateTable
CREATE TABLE "p2pTransferRecord" (
    "id" SERIAL NOT NULL,
    "amount" INTEGER NOT NULL,
    "transferTime" TIMESTAMP(3) NOT NULL,
    "senderUserId" INTEGER NOT NULL,
    "receiverUserId" INTEGER NOT NULL,

    CONSTRAINT "p2pTransferRecord_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "p2pTransferRecord" ADD CONSTRAINT "p2pTransferRecord_senderUserId_fkey" FOREIGN KEY ("senderUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "p2pTransferRecord" ADD CONSTRAINT "p2pTransferRecord_receiverUserId_fkey" FOREIGN KEY ("receiverUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
