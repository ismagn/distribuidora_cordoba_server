
import { Order, User } from "../types";


export const sendWhatsApp = (phoneNumber: User['phone'], order: Order) => {
    const products = order.products.map(i=> i.name)
    
    const header = `Confirmacion de Pedido N°: ${order.id} para ${order.user.name}\nFecha: ${order.createdAt.split('T')[0]}`; 
    const body = `Productos: ${products}`; 
    const footer = `Total a pagar: ${order.totalOrder}`; 
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(header+"\n"+body+"\n"+footer)}`;

    window.open(url, '_blank'); 
  };