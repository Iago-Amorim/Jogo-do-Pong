//Elementos
var vbtIniciar;
var vbtReset;
var vbola;
var vcpu;
var vjogador;
var vPaineltxtPontosJog;
var vPaineltxtPontosCpu;

//Nome
var nome;

//Som do jogo
var somdoGol;
var somRaquete;
var somQuica;
var sominiciodejogo;

//Imagems
var imagembola1;
var imagemcampo1;
var imagembola2=[];
var imagemcampo2=[];

//Controle de animação
var game,frames;

//Posições
var posBolaX,posBolaY;
var posJogadorX,posJogadorY;
var posCpuX,posCpuY;

//Direção de acordo com a tecla
var dirJy;

//Posições iniciais
var posJogIniY=180;
var posCpuIniY=180;
var posBolaIniX=475, posBolaIniY=240;

//Tamanhos
var campoX=0, campoY=0, campoW=960; campoH=500;
var barraW=20, barraH=140, bolaW=20, bolaH=20;

//Direção
var bolaX,bolaY;
var cpuY=0;

//Velocidade
var velBola, velCpu, velJogador;

//Controle
var pontosJog=0;
var pontosCpu=0;
var tecla;
jogo=false;

function controlajog(){
    if(jogo){
        posJogadorY+=velJogador*dirJy;
        if(((posJogadorY+barraH)>=campoH)||((posJogadorY)<=0)){
            posJogadorY+=(velJogador*dirJy)*(-1);
        }
        vjogador.style.top=posJogadorY+"px";
    }
}

function controlacpu(){
    if(jogo){
        if((posBolaX>(campoW/2))&&(bolaX>0)){
            //Movimentar CPU
            if(((posBolaY+(bolaH/2))>(posCpuY+(barraH/2)))){
                //Mover para baixo
                if((posCpuY+barraH)<=campoH){
                    posCpuY+=velCpu;
                }
            }else if((posBolaY+(bolaH/2))<(posCpuY+(barraH/2))){
                //Mover para cima
                if(posCpuY>=0){
                    posCpuY-=velCpu;
                }
            }
        }else{
            //Posicionar CPU no centro
            if((posCpuY+(barraH/2))<(campoH/2)){
                    posCpuY+=velCpu;	
            }else if((posCpuY+(barraH/2))>(campoH/2)){
                    posCpuY-=velCpu;	
            }
        }
        vcpu.style.top=posCpuY+"px";
    }
}

function controlaBola(){
    //Movimentação bola
    posBolaX+=velBola*bolaX;
    posBolaY+=velBola*bolaY;

    //Colisão com jogador
    if((posBolaX<=posJogadorX+barraW)&&((posBolaY+bolaH>=posJogadorY)&&(posBolaY<=posJogadorY+barraH))){
        bolaY=(((posBolaY+(bolaH/2))-(posJogadorY+(barraH/2)))/16);
        bolaX*=-1;
        somRaquete.play();
    }

    //Colisão com Cpu
    if((posBolaX>=posCpuX-barraW)&&((posBolaY+bolaH>=posCpuY)&&(posBolaY<=posCpuY+barraH))){
        bolaY=(((posBolaY+(bolaH/2))-(posCpuY+(barraH/2)))/16);
        bolaX*=-1;
        somRaquete.play();
    }

    //Limites Superior e inferior
    if((posBolaY>=480)||(posBolaY<=0)){
        bolaY*=-1;
        somQuica.pause();
        somQuica.play();
    }

    //Saiu da tela pela direita e pela esquerda
    if(posBolaX>=(campoW-bolaW)){
        velBola=0;
        posBolaX=posBolaIniX;
        posBolaY=posBolaIniY;
        posJogadorY=posJogIniY;
        posCpuY=posCpuIniY;
        pontosJog++;
        vPaineltxtPontosJog.value=pontosJog;
        jogo=false;
        somdoGol.play();
        vjogador.style.top=posJogadorY+"px";
        vcpu.style.top=posCpuY+"px";
    }else{
        if(posBolaX<=0){
        velBola=0;
        posBolaX=posBolaIniX;
        posBolaY=posBolaIniY;
        posJogadorY=posJogIniY;
        posCpuY=posCpuIniY;
        pontosCpu++;
        vPaineltxtPontosCpu.value=pontosCpu;
        jogo=false;
        somdoGol.play();
        vjogador.style.top=posJogadorY+"px";
        vcpu.style.top=posCpuY+"px";
    }
    }

    vbola.style.top=posBolaY+"px";
    vbola.style.left=posBolaX+"px";
}

function teclaDw(){
    tecla=event.keyCode;
    if(tecla==38){//Cima
        dirJy=-1;
    }else if(tecla==40){//Baixo
        dirJy=+1;
    }
}
function teclaUp(){
    tecla=event.keyCode;
    if(tecla==38){//Cima
        dirJy=0;
    }else if(tecla==40){//Baixo
        dirJy=0;
    }
}

function game(){
    if(jogo){
        controlajog();
        controlaBola();
        controlacpu();
    }
    frames=requestAnimationFrame(game);
}

function iniciaJogo(){
    if(!jogo){
        bolaY=0;
        if((Math.random()*10)<5){
            bolaX=-1;
        }else{
            bolaX=1;
        }
        cancelAnimationFrame(frames);
        jogo=true;
        dirJy=0;
        posJogadorX=10;
        posCpuX=930;
        //Posição inicial
        posBolaX=posBolaIniX;
        posBolaY=posBolaIniY;
        posJogadorY=posJogIniY;
        posCpuY=posCpuIniY;

        //velocidade
        velBola=8;
        velJogador=8;
        velCpu=8;
        sominiciodejogo.play();
        game();
    }
}

function Reset(){
    if(!jogo){
        pontosCpu=0;
        vPaineltxtPontosCpu.value=pontosCpu;
        pontosJog=0;
        vPaineltxtPontosJog.value=pontosJog;
    }
}

function Qnome(){
    //Perguntar nome
    alert("Seja bem vindo(a) ao Jogo Pong.");
    nome=prompt("Qual o seu nome?");
    if(nome!=""){
       document.getElementById("texto1").innerHTML=nome.toUpperCase(); 
    }else{
        Qnome();
    }
    
}

window.addEventListener("load",inicializa);
function inicializa(){
    //Nome
    setTimeout(Qnome,250);

    //Iniciar velocidade
    velBola=velJogador=velCpu=8;
  
    //Iniciar
    vbtIniciar=document.getElementById("btIniciar");
    vbtIniciar.addEventListener("click",iniciaJogo);
  
    //Resetar
    vbtReset=document.getElementById("btReiniciar");
    vbtReset.addEventListener("click",Reset);

    //Som
    somQuica=new Audio('Audio/batidabola.mp3');
    somdoGol=new Audio('Audio/gol2.mp3');
    somRaquete=new Audio('Audio/somdesoco.mp3');
    sominiciodejogo=new Audio('Audio/juiz.mp3');

    //Carregar Imagens
    imagembola1=document.getElementById("dvBola");
    imagembola2[0]=new Image();
    imagembola2[0].scr="Images/bola.png";
    imagembola1.style.backgroundImage="url('"+imagembola2[0].scr+"')";
    imagemcampo1=document.getElementById("dvJogo");
    imagemcampo2[0]=new Image();
    imagemcampo2[0].scr="Images/campodefutebol.png";
    imagemcampo1.style.backgroundImage="url('"+imagemcampo2[0].scr+"')";

    vjogador=document.getElementById("dvJogador");
    vcpu=document.getElementById("dvCpu");
    vbola=document.getElementById("dvBola");
    vPaineltxtPontosJog=document.getElementById("txtPontosJog");
    vPaineltxtPontosCpu=document.getElementById("txtPontosCpu");
    document.addEventListener("keydown",teclaDw);
    document.addEventListener("keyup",teclaUp);
}