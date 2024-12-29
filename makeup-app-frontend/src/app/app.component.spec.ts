import { AppComponent } from "./app.component";


describe('AppComponent', () => {


  it('should have a defined title', () => {
    const appComponent = new AppComponent();
    expect(appComponent.title).toBeDefined();
  })

  it('should have the title of makeup-app-frontend', () => {
    const appComponent = new AppComponent();
    expect(appComponent.title).toEqual('makeup-app-frontend');
  })



});