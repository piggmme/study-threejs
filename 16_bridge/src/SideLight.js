import { Mesh } from "three";
import { cm1, cm2, geo, mat } from "./common";

export class SideLight {
  constructor(info) {
    this.name = info.name || "";
    this.x = info.x || 0;
    this.y = info.y || 0;
    this.z = info.z || 0;

    const container = info.container || cm1.scene;

    this.geometry = geo.sideLight;
    this.material = mat.sideLight;

    this.mesh = new Mesh(this.geometry, this.material);
    this.mesh.position.set(this.x, this.y, this.z);

    container.add(this.mesh);
  }

  turnOff() {
    this.mesh.material.color.set(cm2.lightOffColor);
  }
}
