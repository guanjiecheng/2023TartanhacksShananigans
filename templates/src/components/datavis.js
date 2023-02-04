import React, {Component} from "react"
import * as d3 from "d3"

class BarChart extends Component{
    componentDidMount(){
        this.drawChart();
    }

    drawChart(){
        const data = [12, 5, 6, 6, 9, 10];
        
        const svg = d3.select(".tester")
        svg.attr("width",800)
        .attr("height", 800)

        svg.selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .attr("x", (d, i) => i * 70)
            .attr("y", (d, i) => 300 - 10 * d)
            .attr("width", 65)
            .attr("height", (d, i) => d * 10)
            .attr("fill", "green");
    }
    
    render() {
        return <svg className = "tester"></svg>
    }
}

export default BarChart