const Nutrition = ({label, unit, quantity}) => {
    return (
        <div>
            <p><b>{label}</b> - {quantity.toFixed(3)} {unit}</p>
        </div>
    )
}
export default Nutrition;