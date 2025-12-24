"use client"

import { useEffect, useState } from "react"
import { ArrowRight, ShoppingCart, X } from "lucide-react"

type CartItem = {
  serviceId: string
  serviceName: string
  planName?: string
  price: string
}

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [message, setMessage] = useState("")

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("cart") || "[]")
    setCart(stored)
  }, [])

  const removeItem = (index: number) => {
    const updated = [...cart]
    updated.splice(index, 1)
    setCart(updated)
    localStorage.setItem("cart", JSON.stringify(updated))
  }

  const submitRequest = () => {
    const payload = {
      services: cart,
      message,
    }

    console.log("SERVICE REQUEST:", payload)
    // later → send to backend

    alert("Request submitted (demo). Admin will receive this later.")
    localStorage.removeItem("cart")
    setCart([])
    setMessage("")
  }

  return (
    <main className="pt-28 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        <h1 className="font-display text-3xl md:text-4xl font-semibold mb-8 flex items-center gap-3">
          <ShoppingCart className="w-7 h-7" />
          Your Service Cart
        </h1>

        {cart.length === 0 ? (
          <p className="text-muted-foreground">
            No services selected yet.
          </p>
        ) : (
          <>
            {/* Cart Items */}
            <div className="space-y-4 mb-10">
              {cart.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-5 rounded-lg border border-border bg-background"
                >
                  <div>
                    <p className="font-medium">
                      {item.serviceName}
                    </p>
                    {item.planName && (
                      <p className="text-sm text-muted-foreground">
                        Plan: {item.planName}
                      </p>
                    )}
                    <p className="text-sm text-primary">
                      {item.price}
                    </p>
                  </div>

                  <button
                    onClick={() => removeItem(index)}
                    className="text-muted-foreground hover:text-red-500 transition"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Message */}
            <div className="mb-8">
              <label className="block text-sm font-medium mb-2">
                Message / Requirements
              </label>
              <textarea
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell us about your project, timeline, or any specific requirements..."
                className="w-full rounded-md border border-border bg-background p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Submit */}
            <button
              onClick={submitRequest}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition"
            >
              Submit Service Request
              <ArrowRight className="w-4 h-4" />
            </button>

            <p className="text-xs text-muted-foreground mt-3">
              * This sends a service request. No payment is required now.
            </p>
          </>
        )}
      </div>
    </main>
  )
}
