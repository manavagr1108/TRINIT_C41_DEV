import { Chart } from "react-google-charts";

const Charts = ( {data} ) => {
    console.log( "inside charts" )
    console.log( data );

    let formated_data = [ ["URL", "Data"] ];
    data.forEach( (item )=> {
        formated_data.push( [item.url, item.dataSent] );
    })


    console.log( formated_data )

    const options = {
        title: "Emissions based on ur internet usage",
        chartArea: { width: "50%" },
        hAxis: {
            title: "Emissions",
            minValue: 0,
        },
        vAxis: {
            title: "Domain",
        },
    }

    return ( 
    <>
        <div className="chart-wraper"> 
            {
                data.map( (item, i) => {
                    return (
                        <div className="listItem">
                            <h1> {item.url}</h1>
                            <p> {item.dataSent}</p>
                        </div>
                    )
                })
            }

            <Chart
            chartType="BarChart"
            data={formated_data}
            width="100%"
            height="400px"
            options={options}
            />
        </div>
    </> 
    );
}
 
export default Charts;