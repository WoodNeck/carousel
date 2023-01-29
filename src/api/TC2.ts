import Carousel, {
  Action,
  OneByOneControl,
  DefaultRenderer,
  State
} from "../index";

interface PanelData {
  id: number;
}

// 마우스 클릭시
// 다음 패널이 로드되지 않았다면 API 요청
// 그 사이에는 플레이스홀더 이미지 표시
const carousel = new Carousel<PanelData>()
  .addSystem(new OneByOneControl())
  .addSystem(new DefaultRenderer())
  // 초기에 보이는 패널들을 로드
  .addSetup(() => {
    const panelsToLoad = carousel.slides
      .query(SlideQuery.Visible) // Panels가 아닌 QueryResult 리턴, cursor를 포함
      // 앞에는 하나만 로드
      .add(SlideQuery.Fixed(1), cursor => cursor.front)
      // 뒤는 화면 100% 크기만큼 미리 로드
      .add(SlideQuery.ScreenSize("100%"), cursor => cursor.back)
      // 스크린에 보이는 기준으로 패널 정렬
      .order(SlideOrder.Screen)
      // 인덱스 기준으로 패널 정렬 (디폴트)
      .order(SlideOrder.Index)
      .exec();

    // 전부 다
    carousel.slides
      .query(SlideQuery.All)
      .exec();

    // 현재 패널 + 좌 2 + 우 2 총 5개
    carousel.slides
      .query(SlideQuery.Current)
      // 아래와 같이 cursor가 반드시 필요한 타입의 query의 경우, cursor가 없을시 에러 쓰로우하도록
      // 타입으로도 잡아낼 수 있도록..
      .add(SlideQuery.Fixed(2), cursor => cursor.front)
      .add(SlideQuery.Fixed(2), cursor => cursor.back)
      .exec();

    // 안보이는것만 선택하고 싶을 때
    carousel.slides
      // 패널은 포함하지 않고, 커서만 업데이트
      .cursor(SlideQuery.Current)
      .add(SlideQuery.Invisible(2), cursor => cursor.back)
      .exec();

    // 패널 콘텐츠 로드
    panelsToLoad.map(async panel => {
      // 커스텀 데이터 지원
      const id = panel.data.id;

      // HTML 로드라고 가정
      const res = await fetch("SOME_TRUSTED_URL?id=" + id);
      panel.element.innerHTML = res;
    });
  })
  // 사용자 클릭시 안보이는 패널이 로드중이 아닐 경우 로드
  .addAction(Action.onEnter(State.Hold, () => {
    const loadPanelAsync = async () => {
      const el = document.createElement("div");
    }

    console.log("holding start")
  }))
  .mount(document.querySelector("#carousel")!);
