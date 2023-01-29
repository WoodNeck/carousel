// React

const FC = () => {
  const [panels, setPanels] = useState([1, 2, 3]);
  const container = useRef();

  useEffect(() => {
    const carousel = new Carousel<{ id: number }>()
      .add(new OneByOneControl())
      .add(new DefaultRenderer())
      .addSetup(() => {
        // 초기화시 패널 추가 케이스
        setPanels([...panels, 4])

        // 혹은... 유지하면서 내부만 변경?
        // MutationObserver를 트리거하지만 않으면 뭐
        setPanels([...panels])
      })
      .mount(container.current);

    return () => {
      carousel.destroy();
    }
  });

  useEffect(() => {
    // 필요 없음
    // MutationObserver 사용으로 변화 감지시 패널 갱신
  }, [panels]);

  return <div id="carousel" className="carousel-container">
    <div className="carousel-slider">{
      panels.map(id => (
        <div className="carousel-panel" key={id} data-id={id}>{id}</div>
      ))
    }</div>
  </div>
}
