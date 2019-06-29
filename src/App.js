
import React, { Component } from "react";
import ReactDOM from "react-dom";
import * as THREE from "three";

class App extends Component {
  componentDidMount() {
    // === THREE.JS CODE START ===
    var scene = new THREE.Scene();

    var camera1 = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    var camera2 = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    {
      const color = 0xFFFFFF;
      const intensity = 2;
      const light = new THREE.DirectionalLight(color, intensity);
      light.position.set(-1, 2, 4);
      scene.add(light);
    }

    var geometry_box = new THREE.BoxGeometry(1, 1, 1);
    var material_box = new THREE.MeshPhongMaterial({ color: 0x44aa88 });
    var cube = new THREE.Mesh(geometry_box, material_box);

    function makeInstance(geometry, color, x) {
      const material = new THREE.MeshPhongMaterial({ color });

      const cube = new THREE.Mesh(geometry, material);
      scene.add(cube);

      cube.position.x = x;

      return cube;
    }

    const cubes = [
      makeInstance(geometry_box, 0x44aa88, 0),
      makeInstance(geometry_box, 0x8844aa, -3),
      makeInstance(geometry_box, 0xaa8844, 3),
    ];

    var material_line = new THREE.LineBasicMaterial({ color: 0x0000ff });
    var geometry_line = new THREE.Geometry();
    geometry_line.vertices.push(new THREE.Vector3(-10, 0, 0));
    geometry_line.vertices.push(new THREE.Vector3(0, 10, 0));
    geometry_line.vertices.push(new THREE.Vector3(10, 0, 0));
    var line = new THREE.Line(geometry_line, material_line);

    // scene.add(cube);

    camera1.position.z = 5;
    camera2.position.set(0, 0, 100);
    camera2.lookAt(0, 0, 0);

    function render(time) {
      time *= 0.001;  // convert time to seconds

      cubes.forEach((cube, ndx) => {
        const speed = 1 + ndx * .1;
        const rot = time * speed;
        cube.rotation.x = rot;
        cube.rotation.y = rot;
      });

      renderer.render(scene, camera1);

      requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
    // === THREE.JS EXAMPLE CODE END ===
  }
  render() {
    return (
      <div ref={ref => (this.mount = ref)} />
    )
  }
}
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

export default App;