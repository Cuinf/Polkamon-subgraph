import { Transfer } from '../generated/Polkamon/Polkamon'
import { PolkamonOwner } from '../generated/schema'

export function handleTransfer(event: Transfer): void {
    let id = event.params.tokenId.toHex()
    let polkamon = PolkamonOwner.load(id)
    if (polkamon == null) {
        polkamon = new PolkamonOwner(id)
    }
    polkamon.owner = event.params.to
    polkamon.save()
}