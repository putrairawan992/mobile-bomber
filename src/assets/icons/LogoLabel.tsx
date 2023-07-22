
import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

interface Props {
    color: string
    size: number
    focused?: boolean
}

export const LogoLabel = (props: Props) => {
    return (
        <Svg
            viewBox="0 0 228 228"
            width={props.size}
            height={props.size}
        >
            <Path
                fill={props.color}
                d="M124.242 42.152v31.965a3.554 3.554 0 01-3.547 3.547H107.25a3.554 3.554 0 01-3.547-3.547V58.782H88.665v61.848l-12.085-6.966c-.255-.149-.489-.298-.722-.446 0 0-.021 0-.021-.021l-.383-.255c-.127-.085-.254-.17-.36-.276-.128-.085-.234-.192-.362-.277-.127-.084-.233-.191-.34-.297-.106-.106-.233-.191-.34-.297a83.641 83.641 0 01-.297-.298l-.042-.042a4.087 4.087 0 01-.298-.319c-.106-.106-.212-.212-.297-.318-.106-.106-.191-.213-.297-.34-.085-.085-.149-.17-.234-.276a.639.639 0 01-.106-.149c-.064-.064-.106-.149-.17-.212-.021-.021-.043-.064-.064-.085-.064-.106-.149-.191-.212-.298-.022-.021-.043-.063-.064-.084-.064-.107-.127-.192-.191-.298 0-.021-.021-.021-.021-.042-.064-.106-.15-.234-.213-.34 0 0-.02-.021-.02-.043-.065-.127-.15-.233-.213-.361v-.021c-.064-.127-.15-.255-.213-.382-.063-.106-.106-.234-.17-.34l-.064-.128c-.042-.106-.106-.212-.148-.339-.064-.128-.106-.255-.17-.383 0-.021-.021-.042-.021-.063-.043-.128-.106-.255-.149-.383a170.94 170.94 0 01-.127-.382c-.022-.042-.022-.085-.043-.127-.042-.107-.064-.234-.106-.34v-.021c-.043-.128-.064-.255-.106-.404 0-.021-.021-.043-.021-.064-.022-.127-.064-.233-.086-.361 0-.021-.02-.042-.02-.085-.022-.106-.043-.233-.064-.34-.022-.148-.064-.276-.085-.424a18.88 18.88 0 00-.064-.425 3.145 3.145 0 01-.043-.446 15.556 15.556 0 01-.063-1.423V66.385c0-3.78 1.508-7.37 4.12-9.982.319-.319.659-.637 1.02-.934.233-.192.488-.383.743-.574.382-.276.765-.53 1.19-.765l30.287-17.5a14.143 14.143 0 0114.146 0c.021.02.043.042.085.042.531.319.998.7 1.402 1.126.318.36.616.743.849 1.146.553.977.85 2.082.85 3.208z"
            ></Path>
            <Path
                fill={props.color}
                d="M158.438 66.385v35.024c0 5.055-2.697 9.727-7.073 12.255l-30.309 17.501a14.144 14.144 0 01-14.145 0 6.385 6.385 0 01-3.186-5.522V92.998a3.553 3.553 0 013.547-3.547h13.423a3.553 3.553 0 013.547 3.547v16.057h15.059v-61.89l12.086 6.965a14.18 14.18 0 017.051 12.255zM41.82 154.528c0-1.676-.722-2.682-1.805-3.275s-2.553-.774-3.997-.774c-1.058 0-1.728.181-2.115.465-.387.309-.516.722-.516 1.212 0 .412.052.85.155 1.289.103.464.155.928.18 1.367v8.871h-12.48v-9.155c0-1.625-.671-2.63-1.729-3.249-1.057-.593-2.527-.8-4.1-.8-1.057 0-1.702.181-2.089.465-.412.309-.515.722-.515 1.212 0 .412.051.85.18 1.289.103.464.155.928.18 1.367v25.04c0 1.134.413 2.166 1.135 2.888a3.957 3.957 0 002.914 1.238c1.16 0 2.166-.49 2.889-1.238.722-.722 1.134-1.754 1.134-2.888v-8.098h12.482v8.098c0 1.134.438 2.166 1.16 2.888a3.985 3.985 0 002.888 1.238 4.008 4.008 0 002.888-1.213c.723-.722 1.16-1.779 1.16-2.913v-25.324zM46.307 171.11c0 3.533 1.444 6.756 3.79 9.077 2.347 2.321 5.57 3.791 9.078 3.791 3.533 0 6.782-1.47 9.103-3.791a12.826 12.826 0 003.765-9.077c0-3.507-1.444-6.757-3.765-9.078a12.891 12.891 0 00-9.103-3.764c-3.507 0-6.73 1.444-9.077 3.764a12.79 12.79 0 00-3.791 9.078zm8.123 0c0-1.341.516-2.579 1.367-3.482a4.614 4.614 0 013.378-1.469c1.34 0 2.527.567 3.378 1.469a5.075 5.075 0 011.367 3.482c0 1.341-.516 2.604-1.367 3.507a4.542 4.542 0 01-3.378 1.496 4.541 4.541 0 01-3.378-1.496c-.851-.903-1.367-2.166-1.367-3.507zM76.427 179.929c0 1.135.438 2.14 1.16 2.862.723.748 1.754 1.187 2.889 1.187a4.015 4.015 0 002.862-1.187 4.03 4.03 0 001.187-2.862V154.27c0-1.134-.465-2.14-1.187-2.862-.748-.722-1.753-1.186-2.862-1.186a4.092 4.092 0 00-2.888 1.186c-.723.722-1.16 1.728-1.16 2.862v25.659zM89.888 151.382c0 1.161.464 2.192 1.212 2.914.722.722 1.78 1.16 2.94 1.16 1.135 0 2.192-.438 2.94-1.16a4.023 4.023 0 001.212-2.914 4.113 4.113 0 00-1.212-2.914c-.748-.722-1.805-1.16-2.94-1.16-1.16 0-2.218.438-2.94 1.16a4.113 4.113 0 00-1.212 2.914zm.207 28.547c0 1.135.438 2.141 1.16 2.863.722.747 1.728 1.186 2.862 1.186 1.135 0 2.14-.439 2.863-1.186a4.032 4.032 0 001.186-2.863v-17.664a4.032 4.032 0 00-1.186-2.863 4.031 4.031 0 00-2.863-1.186c-1.134 0-2.14.464-2.862 1.186s-1.16 1.728-1.16 2.863v17.664zM127.1 151.253c-.722-.722-1.754-1.16-2.889-1.16a3.994 3.994 0 00-2.836 1.16 4.053 4.053 0 00-1.212 2.888v6.112c-1.728-1.263-3.662-1.985-5.57-1.985-3.533 0-6.551 1.444-8.691 3.79-2.14 2.347-3.378 5.545-3.378 9.078 0 3.532 1.238 6.756 3.378 9.077 2.14 2.321 5.158 3.79 8.691 3.79 3.378 0 6.086-1.34 7.968-3.507l.232.568c.619 1.934 1.702 2.939 3.249 2.939 1.47 0 2.218-.773 2.218-2.217v-27.645c0-1.134-.438-2.14-1.16-2.888zm-11.708 24.885a4.54 4.54 0 01-3.378-1.495c-.851-.903-1.367-2.167-1.367-3.507 0-1.341.516-2.605 1.367-3.508a4.614 4.614 0 013.378-1.47c1.341 0 2.553.568 3.404 1.47a5.265 5.265 0 011.367 3.508c0 1.34-.542 2.604-1.367 3.507a4.597 4.597 0 01-3.404 1.495zM156.601 158.242c-1.547 0-2.63 1.006-3.249 2.939l-.026.078c-1.78-1.883-4.281-2.991-7.375-2.991-3.507 0-6.731 1.444-9.078 3.79-2.346 2.347-3.79 5.545-3.79 9.078 0 3.532 1.444 6.756 3.79 9.077 2.347 2.321 5.571 3.791 9.078 3.791 3.043 0 5.492-1.083 7.246-2.863l.155.387c.619 1.47 1.599 2.476 3.146 2.476s2.321-.851 2.321-2.399v-21.146c0-1.469-.748-2.217-2.218-2.217zm-7.272 16.401a4.54 4.54 0 01-3.378 1.495 4.544 4.544 0 01-3.379-1.495c-.851-.903-1.366-2.167-1.366-3.507 0-1.341.515-2.605 1.366-3.508a4.617 4.617 0 016.757 0c.851.903 1.367 2.167 1.367 3.508 0 1.34-.516 2.604-1.367 3.507zM170.449 183.488c-.464.258-1.031.439-1.676.542-.645.129-1.289.283-1.882.49-1.238.438-2.218 1.16-2.218 2.888 0 2.45 1.728 3.997 4.487 3.997 3.92-.077 7.092-1.831 8.613-5.132l10.238-22.281c.722-1.547.567-2.784.077-3.713-.49-.928-1.264-1.496-1.805-1.779-1.109-.516-2.218-.568-3.198-.232a3.844 3.844 0 00-2.269 2.089c-.206.438-.696 1.779-1.47 3.996-.774 2.218-1.934 5.338-3.455 9.387l-4.874-13.229a3.59 3.59 0 00-2.27-2.218 4.445 4.445 0 00-3.249.207c-1.031.49-1.728 1.289-2.037 2.269-.31.98-.284 2.166.206 3.223a854.67 854.67 0 003.997 8.356c1.006 2.089 2.012 4.203 2.785 5.776l.929 1.934c.232.49.335.748.361.774l-1.29 2.656zM191.028 171.11c0 3.533 1.444 6.756 3.791 9.077 2.346 2.321 5.57 3.791 9.077 3.791 3.533 0 6.782-1.47 9.103-3.791a12.827 12.827 0 003.765-9.077c0-3.507-1.444-6.757-3.765-9.078a12.892 12.892 0 00-9.103-3.764c-3.507 0-6.731 1.444-9.077 3.764a12.79 12.79 0 00-3.791 9.078zm8.123 0c0-1.341.516-2.579 1.367-3.482a4.613 4.613 0 013.378-1.469c1.341 0 2.527.567 3.378 1.469a5.075 5.075 0 011.367 3.482c0 1.341-.516 2.604-1.367 3.507a4.541 4.541 0 01-3.378 1.496 4.541 4.541 0 01-3.378-1.496c-.851-.903-1.367-2.166-1.367-3.507z"
            ></Path>
        </Svg>
    )
}
