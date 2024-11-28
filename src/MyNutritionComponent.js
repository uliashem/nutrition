function MyNutritionComponent({label, quantity, unit}) {
  return (
    <div className="list"><p><b>{label}</b>: {quantity.toFixed(2)} {unit}</p></div>
  )
}

export default MyNutritionComponent;