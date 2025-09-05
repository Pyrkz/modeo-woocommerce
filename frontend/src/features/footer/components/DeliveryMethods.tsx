const DeliveryMethods = () => {
  const deliveryMethods = ['FURGONETKA', 'KURIER', 'PACZKOMAT'];
  
  return (
    <div>
      <h5 className="text-sm font-medium text-gray-900 mb-2">Dostawa:</h5>
      <div className="flex items-center gap-3">
        {deliveryMethods.map((method) => (
          <div key={method} className="bg-white border rounded px-3 py-1 text-xs font-medium text-gray-700">
            {method}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeliveryMethods;