let capture
let detector


function preload() {
}

async function setup() {

	createCanvas(640, 480, WEBGL)

	capture = createCapture(VIDEO)
	capture.size(640, 480)
	capture.hide()

	console.log("Carico modello...")
	detector = await createDetector()
	console.log("Modello caricato.")

}

async function draw() {
    translate (-width/2, -height/2)

	background(255)
    
	// Disegna la webcam sullo stage, a specchio
	push()
	scale(-1, 1)
	image(capture, -640, 0)
	pop()
}

async function createDetector() {
	// Configurazione Media Pipe
	// https://google.github.io/mediapipe/solutions/hands
	const mediaPipeConfig = {
		runtime: "mediapipe",
		modelType: "full",
		maxHands: 2,
		solutionPath: `https://cdn.jsdelivr.net/npm/@mediapipe/hands`,
	}
	return window.handPoseDetection.createDetector( window.handPoseDetection.SupportedModels.MediaPipeHands, mediaPipeConfig )
}
