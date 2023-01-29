import Carousel, {
  Action,
  OneByOneControl,
  State
} from "../index";

const carousel = new Carousel()
  .addSystem(OneByOneControl)
  .addAction(Action.onEnter(State.Init, () => {
    console.log("init start");
  }))
  .addAction(Action.onUpdate(State.Init, () => {
    console.log("init");
  }))
  .addAction(Action.onExit(State.Init, carousel => {
    console.log("init end");
  }))
  .addAction(Action.onEnter(State.Destroy, () => {
    console.log("destroy start");
  }))
  .addAction(Action.onUpdate(State.Destroy, () => {
    console.log("destroy");
  }))
  .addAction(Action.onExit(State.Destroy, carousel => {
    console.log("destroy end");
  }))
  .addAction(Action.onEnter(State.Idle, () => {
    console.log("idle start")
  }))
  .addAction(Action.onUpdate(State.Idle, () => {
    console.log("idle")
  }))
  .addAction(Action.onExit(State.Idle, () => {
    console.log("idle end")
  }))
  .addAction(Action.onEnter(State.Hold, () => {
    console.log("holding start")
  }))
  .addAction(Action.onUpdate(State.Hold, () => {
    console.log("holding")
  }))
  .addAction(Action.onExit(State.Hold, () => {
    console.log("holding end")
  }))
  .addAction(Action.onEnter(State.Animating, () => {
    console.log("animating start")
  }))
  .addAction(Action.onUpdate(State.Animating, () => {
    console.log("animating")
  }))
  .addAction(Action.onExit(State.Animating, () => {
    console.log("animating end")
  }))
  .mount(document.querySelector("#carousel")!);
