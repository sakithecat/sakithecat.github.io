/*
This is very low quality. I don't care.
*/

// poached from stackoverflow.
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

// globals mixed with variable declaration. Example antipattern. Saki isn't very good at writing disciplined code on her own time.
var SIZE=500
var RADIUS = SIZE/10
var canvas = createHiPPICanvas(SIZE,SIZE)
context = canvas.getContext('2d');
canvas.width = SIZE
canvas.height = SIZE
document.body.appendChild(canvas);

context.strokeStyle = "white";
context.fillStyle = "white";
context.textAlign = 'center';

var button = document.createElement("button");
button.innerText = "Have Idea"
button.addEventListener('click', newIdea)
button.classList.add("butt")
button.classList.add("shadow")
var textbox = document.createElement("h2");
textbox.innerHTML = "<br>"


known_saki_ideas = [
    "Play the piano",
    "Consider having illegal ideas",
    "Make a program that simulates Saki's ideas",
    "Identify and attempt to eat a bug",
    "Sploot",
    "Decide that a bug is actually a lint",
    // "Steal Ino's food",
    "Lick mode! (or Bite mode?)",
    // "Create an alphabet based on all possible ideas",
    "Spend a while making cool shapes out of lines",
    "Make an instagram post",
    "Pry blanket off of Estelle if she sleeps in past 7:00 AM",
    "Lament about height of tall furniture",
    "Tear open leftover burrito. (Don't worry about the tin foil)",
    "Squeeze head out of window crack (and get stuck)",
    "Become vacuum cleaner (deposit lint on next person to pick Saki up)",
    "Eat trash can snack",
    "Outdoor Adventure (brief)",
    ["Point eyeballs in different directions", 0b10010],
    ["Steal fish food", 0b1110],
    ["Jump inside cardboard box", 0b110010],
    ["4x4 mode", 0b001100],
    ["Try very hard to have two ideas at the same time", 0b10010],
    ["The most advanded idea possible ... (It's unknown if Saki has yet acheived this thought)", 0b111111]
    
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
    function indexToPos(index){
        padded_radius = RADIUS * 1.1
        return [padded_radius + Boolean(index & 1) * (SIZE- 2*padded_radius), padded_radius + Boolean(index & 2) * (SIZE- 2*padded_radius),]
    }
    //draw circles
    for (var i = 0; i < n_brain_cells; i++){
        var coords=indexToPos(i)
        ctx.beginPath();
        ctx.arc(coords[0], coords[1], SIZE/10, 0, 2 * Math.PI);
        ctx.stroke(); 
        
    }
    /*
         1
     _________
    |\      /|
   2| \3  4/ |5
    |  \  /  |
    |   \/   |
    |   /\   |
    |  /  \  |
    | /    \ |
    |/   6  \|
    ----------
    */
    var vertices=[
        [0,1],
        [0,2],
        [0,3],
        [1,2],
        [1,3],
        [2,3],
        // [0,4],
        // [3,5],
    ]
    vertices.forEach((v, i)=>{
        if (edges & (1<<i)){
            start = indexToPos(v[0])
            end =   indexToPos(v[1])
            drawLine(ctx, start[0], start[1], end[0], end[1])
        }
    })
}

function random_idea(){
    var idea_index = Math.floor(Math.random()*known_saki_ideas.length)
    var idea = known_saki_ideas[idea_index];

    var idea_shape = 0
    while (illegal_ideas.includes(idea_shape)){
        idea_shape = ~~(Math.random()*(1<<6))
    }
    known_saki_ideas.splice(idea_index,1)
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

function newIdea(){
    clear()
    var idea = random_idea()
    
    drawIdea(context,idea.shape )
    textbox.innerHTML = idea.text
}
function start(){
    clear()
    drawIdea(context,0,4)
    var br =  document.createElement("br");
    document.body.appendChild(br)

    document.body.appendChild(textbox)
    document.body.appendChild(button)
}
function intro(){
    // The lowest-quality snippet in this whole file.
    clear()
    setTimeout(()=>{
        drawText(context, "Saki's", SIZE/2, SIZE*.2, SIZE/5)
        setTimeout(()=>{
            drawText(context, "Idea", SIZE/2, SIZE*.5, SIZE/5)
            setTimeout(()=>{
                drawText(context, "Generator", SIZE/2, SIZE*.8, SIZE/5.5)
                setTimeout(()=>{
                    clear()
                    drawText(context, "Saki only has 4 brain cells...", SIZE/2, SIZE/2, SIZE/20)
                    setTimeout(()=>{
                        clear()
                        drawText(context, "Saki only has 4 brain cells...", SIZE/2, SIZE/2, SIZE/20)
                        drawIdea(context,0,1)
                        setTimeout(()=>{
                            clear()
                            drawText(context, "Saki only has 4 brain cells...", SIZE/2, SIZE/2, SIZE/20)
                            drawIdea(context,0,2)
                            setTimeout(()=>{
                                clear()
                                drawText(context, "Saki only has 4 brain cells...", SIZE/2, SIZE/2, SIZE/20)
                                drawIdea(context,0,3)
                                setTimeout(()=>{
                                    clear()
                                    drawText(context, "Saki only has 4 brain cells...", SIZE/2, SIZE/2, SIZE/20)
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

intro()
// start() //Skip intro. For development.