var url = "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/global-temperature.json";

var margin = {top:10,right:10,bottom:50,left:50};
var w = 700-margin.left-margin.right;
var h = 450-margin.top-margin.bottom;

var xScale = d3.scale.linear().range([0,w]);
var xVal = function(d){ return d.year;};
var xMap = function(d){ return xScale(d.year);};
var xAxis = d3.svg.axis().scale(xScale).orient("bottom");

var yScale = d3.scale.linear().range([h,0]);
var yVal = function(d){ return d.month;};
var yMap = function(d){ return yScale(d.month);};
var yAxis = d3.svg.axis().scale(yScale).orient("left");

$(document).ready(function(){
  $.get(url, function(result){
    var data = JSON.parse(result);
    var dataset = data.monthlyVariance;
    
    xScale.domain([d3.min(dataset,xVal), d3.max(dataset,xVal)]);
    yScale.domain([d3.min(dataset,yVal), d3.max(dataset,yVal)]);
    
    var svg = d3.select("body")
      .append("svg")
      .attr("width",w+margin.left+margin.right)
      .attr("height",h+margin.top+margin.bottom)
     .append("g")
      .attr("transform","translate(" + margin.left+"," + margin.top+")");
    
    svg.append("g")
      .attr("class","x axis")
      .attr("transform","translate(0,"+h+")")
      .call(xAxis)
     .append("text")
      .attr("class", "label")
      .attr("x", w/2)
      .attr("y", 40)
      .text("Year")
      .style("text-anchor","middle");
    
    svg.append("g")
      .attr("class","y axis")
      .call(yAxis)
     .append("text")
      .text("Month")
      .attr("class","label")
      .attr("transform","rotate(90)")
      .attr("x",h/2)
      .attr("y",40)
      .style("text-anchor","middle");
  });
});
