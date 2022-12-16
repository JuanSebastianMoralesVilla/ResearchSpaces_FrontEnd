import { Chart } from 'react-google-charts';
import { PropTypes } from 'prop-types';

export function Piechart(props) {
    return (
        <Chart
          chartType="PieChart"
          data={props.data}
          options= {{title: "Proyectos por fase"}}
          width={"100%"}
          height={"400px"}
        />
      );
}

Piechart.propTypes = {
  data: PropTypes.array
}
