import Echo from 'laravel-echo'
import Pusher from 'pusher-js'

export default defineNuxtPlugin(() => {
  const config  = useRuntimeConfig()
  const uiStore = useUiStore()

  // @ts-ignore
  window.Pusher = Pusher

  const echo = new Echo({
    broadcaster:       'reverb',
    key:               config.public.reverbKey,
    wsHost:            config.public.reverbHost,
    wsPort:            Number(config.public.reverbPort),
    forceTLS:          location.protocol === 'https:',
    encrypted:         true,
    enabledTransports: ['ws', 'wss'],
  })

  // Giai đoạn 3: Stock updates real-time
  echo.channel('inventory').listen('.stock.updated', (e: any) => {
    if (e.is_low) {
      uiStore.addToast(`Tồn kho thấp: ${e.product} (còn ${e.quantity})`, 'warning')
    }
  })

  // Giai đoạn 3: PickList notifications cho WMS staff
  echo.channel('warehouse.1').listen('.picklist.created', (e: any) => {
    uiStore.addToast(`Pick List #${e.pick_list_id} mới (${e.items_count} items)`, 'info')
  })

  return { provide: { echo } }
})
