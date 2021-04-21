import { Transfer } from '../generated/PolkamonOfficialCollection/PolkamonOfficialCollection'
import { PolkamonOwner } from '../generated/schema'

export function handleTransfer(event: Transfer): void {
    let id = event.params.tokenId.toHex()
    let kitty = new PolkamonOwner(id)
    if (kitty == null) {
        kitty = new PolkamonOwner(id)
    }
    kitty.owner = event.params.to
    kitty.save()
}