import { Transfer, MintCall, Polkamon } from '../generated/Polkamon/Polkamon'
import { PolkamonOwner, PolkamonBalance, TransferTrace } from '../generated/schema'
import { BigInt } from "@graphprotocol/graph-ts"

export function handleTransfer(event: Transfer): void {
    let id = event.params.tokenId.toHex()
    let polkamon = new PolkamonOwner(id)
    
    polkamon.tokenId = event.params.tokenId
    polkamon.owner = event.params.to
    polkamon.contract = event.address
    polkamon.save()

    //collect the entities of transfer traces
    let transferEntity = new TransferTrace(event.transaction.hash.toHex())
    transferEntity.from = event.params.from
    transferEntity.to = event.params.to
    transferEntity.timestamp = event.block.timestamp
    transferEntity.save()

    //update the amount of tokens hold by an owner
    let contract = Polkamon.bind(event.address)
    let polkamonBalance = new PolkamonBalance(event.params.to.toHex())
    polkamonBalance.amount = contract.balanceOf(event.params.to)
    polkamonBalance.save()
}

export function handleMint(call: MintCall): void {
    let id = call.inputs.to.toHex()
    let polkamonBalance = PolkamonBalance.load(id)
    if (polkamonBalance == null) {
        polkamonBalance = new PolkamonBalance(id)
    }
    polkamonBalance.amount = BigInt.fromI32(1)
    polkamonBalance.save()
}