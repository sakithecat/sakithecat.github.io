
function createHiPPICanvas(width, height) {
    const ratio = 2* window.devicePixelRatio;
    const canvas = document.createElement("canvas");

    canvas.width = width * ratio;
    canvas.height = height * ratio;
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
    canvas.getContext("2d").scale(ratio, ratio);

    return canvas;
}
var canvas = createHiPPICanvas(700,700)
context = canvas.getContext('2d');

var SIZE=700
canvas.width = SIZE
canvas.height = SIZE
document.body.appendChild(canvas);
console.log("test")

context.strokeStyle = "white";
context.fillStyle = "white";

context.textAlign = 'center';

function drawLine(ctx,x1,y1,x2,y2){
    ctx.beginPath()
    ctx.moveTo(x1,y1)
    ctx.lineTo(x2,y2)
    ctx.stroke()
}

function drawText(ctx, text, x, y, size=20){
    context.font = size + 'px monospace';
    ctx.fillText(text, x, y);
}

function clear(ctx=context){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawIdea(ctx, edges, n_brain_cells=4){
    // ctx.lineWidth = 10;

    function indexToPos(index){
        return [SIZE/4 + Boolean(index & 1) * SIZE/2, SIZE/4 + Boolean(index & 2) * SIZE/2]
    }
    //draw circles
    for (var i = 0; i < n_brain_cells; i++){
        var coords=indexToPos(i)
        ctx.beginPath();
        ctx.arc(coords[0], coords[1], SIZE/10, 0, 2 * Math.PI);
        ctx.stroke(); 
        
    }
    //draw lines
    var vertices=[
        [0,1],
        [0,2],
        [0,3],
        [1,2],
        [1,3],
        [2,3]
    ]
    vertices.forEach((v, i)=>{
        console.log(i, edges, (1 << i))
        if (edges & (1<<i)){
            start = indexToPos(v[0])
            end =   indexToPos(v[1])
            console.log(start, end)
            drawLine(ctx, start[0], start[1], end[0], end[1])
        }
    })
}

known_saki_ideas = [
    "play the piano",
    "consider having illegal ideas",
    "make a program that simulates saki's ideas",
    "identify and eat a bug",
    "sploot",
    ["4x4 mode", 0b001100],
    "decide that a bug is actually a lint",
    "point eyeballs in different directions",
    "Steal Ino's food",
    "Bite or Lick",
    "Create an alphabet based on all possible ideas",
    "Spend a while making cool shapes out of lines",
    "Make an instagram post",
    ["Try very hard to have two ideas at the same time", 0b10010]
    
]


illegal_ideas = [0]
function load_illegal_ideas(){
    known_saki_ideas.forEach((idea)=>{
        if (idea.constructor == Array){
            illegal_ideas.push(idea[1])
        }
    })

}
load_illegal_ideas()
console.log(illegal_ideas)
function random_idea(){
    var idea_index = Math.floor(Math.random()*known_saki_ideas.length)
    var idea = known_saki_ideas[idea_index];

    var idea_shape = 0
    while (idea_shape in illegal_ideas){
        idea_shape = ~~(Math.random()*(1<<6))
    }
    known_saki_ideas.splice(idea_index,1)
    console.log(known_saki_ideas, idea)
    if (idea == undefined){
        idea = "Uh-oh. Saki is out of ideas."
        idea_shape = 0
    }
    else if (idea.constructor == Array){
        idea_shape = idea[1]
        idea = idea[0]
    }
    illegal_ideas.push(idea_shape)
    return {
        "text": idea,
        "shape": idea_shape
    }
}
// drawIdea(context, 0)
intro()
// start()
function newIdea(){
    clear()
    var idea = random_idea()
    
    drawIdea(context,idea.shape )
    drawText(context, idea.text, SIZE/2, SIZE*.9 )
}
function start(){
    clear()
    drawIdea(context,0,4)
    var br =  document.createElement("br");
    document.body.appendChild(br)
    var button = document.createElement("button");
    button.innerText = "Have Idea"
    button.addEventListener('click', newIdea)
    document.body.appendChild(button)
    button.classList.add("butt")
    button.classList.add("shadow")
}
function intro(){
    // document.getElementById("idea_button").style.display = 'none';
    clear()
    setTimeout(()=>{
        drawText(context, "Saki's", SIZE/2, SIZE*.2, 130)
        setTimeout(()=>{
            drawText(context, "Idea", SIZE/2, SIZE*.5, 130)
            setTimeout(()=>{
                drawText(context, "Generator.", SIZE/2, SIZE*.8, 130)
                setTimeout(()=>{
                    clear()
                    drawText(context, "Saki only has 4 brain cells...", SIZE/2, SIZE/2, 30)
                    setTimeout(()=>{
                        clear()
                        drawText(context, "Saki only has 4 brain cells...", SIZE/2, SIZE/2, 30)
                        drawIdea(context,0,1)
                        setTimeout(()=>{
                            clear()
                            drawText(context, "Saki only has 4 brain cells...", SIZE/2, SIZE/2, 30)
                            drawIdea(context,0,2)
                            setTimeout(()=>{
                                clear()
                                drawText(context, "Saki only has 4 brain cells...", SIZE/2, SIZE/2, 30)
                                drawIdea(context,0,3)
                                setTimeout(()=>{
                                    clear()
                                    drawText(context, "Saki only has 4 brain cells...", SIZE/2, SIZE/2, 30)
                                    drawIdea(context,0,4)
                                    setTimeout(()=>{
                                        start()
                                    }, 700)
                                },600)
                            },300)
                        },300)
                    },1200)
                },1500)
            },800)
        },800)
    },1000)
}

