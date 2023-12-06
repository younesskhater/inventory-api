const products = [
    {
        name: "Morocan Table",
        category: "Table",
        material: "Wood",
        minQuantity: 200,
        characteristics: [{size: 'XXL'},{shape:'oval'}],
    },
    {
        name: "Morocan Chair",
        category: "Chair",
        material: "Wood",
        minQuantity: 200,
        characteristics: [{size: 'XXL'}],
    },
    {
		name: "Historical lamp",
		category: "Lamp",
		material: "Crystal",
		minQuantity: 100,
        characteristics: [
			{
				brightness: "midium"
			}
		],
	},
    {
		name: "Morocan Sofa",
		category: "Sofa",
		material: "Leather",
		minQuantity: 100,
        characteristics: [
			{ frame: "solid" },
            { comfort: "high" }
		],
	},
    {
        characteristics: [
            {
                softness: "high"
            }
        ],
        name: "Jungle bed",
        category: "bed",
        material: "Wood & feather",
        minQuantity: 100
    }
]

module.exports = products;