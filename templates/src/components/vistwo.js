import React, {Component} from "react"
import * as d3 from "d3"
import medium from "./medium.csv"
import "./datavis.css"


class bars extends Component{
    componentDidMount(){
        this.drawChart();
    }

    drawChart(){
        const margin = { top: 60, right: 250, bottom: 30, left: 200 };
        const width = 1000;
        const height = 500;
      
        const xRange = [margin.left, width - margin.right];
        const yRange = [margin.top, height - margin.bottom];
      
        // Construct scales and axes.
        const xScale = d3.scaleLinear().range(xRange);
        const yScale = d3.scaleBand().range(yRange).padding(0.1);
      
        const xAxis = d3.axisTop(xScale);
        const yAxis = d3.axisLeft(yScale);

        const svg = d3.select(".medium-price")
            .attr("width", width)
            .attr("height", height)
            .attr("viewBox", [0, 0, width, height]);

        svg
        .append("g")
        .attr("class", "xaxis")
        .attr("transform", `translate(0,${margin.top})`);

        svg
        .append("g")
        .attr("class", "yaxis")
        .attr("transform", `translate(${margin.left},0)`);

        const bars = svg.append("g").attr("fill", "#4099E8");
        const texts = svg
        .append("g")
        .attr("fill", "white")
        .attr("text-anchor", "end")
        .attr("font-family", "sans-serif")
        .attr("font-size", 10)

        d3.csv(medium).then((d) =>{
            var meds = []
            var prices = []
            d.forEach(d =>{
                meds.push(d.medium)
                prices.push(d.avg)
            })

            yScale.domain(meds);
            xScale.domain([0,3588890]);

            svg
            .append("g")
            .attr("class", "xaxis")
            .attr("id", "xAxis")
            .attr("transform", `translate(0, ${height - margin.bottom})`);

            svg
            .append("g")
            .attr("class", "yaxis")
            .attr("id", 'yAxis')
            .attr("transform", `translate(${margin.left},0)`);

            const bars = svg.selectAll("rect").data(d).enter().append("g");
            const texts = svg
                        .append("g")
                        .attr("text-anchor", "end")
                        .attr("font-family", "sans-serif")
                        .attr("font-size", 12);
        
            bars
                .append('rect')
                .attr('id','barChart')
                .attr('x',xScale(0))
                .attr('y', (y) => yScale(y.medium))
                .attr('height',40)
                .attr('width',(x) =>{
                    return xScale(x.avg)-xScale(0);
                })
                .style('fill',"#4099E8")
        
            svg
            .append("text")
            .attr("font-size", 14)
            .attr("fill", "white")
            .attr("font-weight", 550)
            .attr("fill-opacity", 1)
            .attr("text-anchor", "front")
            .attr("x", 0)
            .attr("y", height / 2)
            .attr(
                "transform",
                `translate(${-160},${height / 2}) rotate(-90)`
            )
            .text("Medium of artwork");

            svg
            .append("text")
            .attr("font-size", 14)
            .attr("fill", "white")
            .attr("font-weight", 550)
            .attr("fill-opacity", 1)
            .attr("text-anchor", "front")
            .attr("x", width/3)
            .attr("y", 25)
            .text("Price artwork sold for (USD)");

            svg.select('.xaxis').call(xAxis);
            svg.select('.yaxis').call(yAxis);
        })

    }

    render() {
        return (
            <div className = "vis">
                <svg className = "medium-price"></svg>
            </div>
        )
    }
}

export default bars