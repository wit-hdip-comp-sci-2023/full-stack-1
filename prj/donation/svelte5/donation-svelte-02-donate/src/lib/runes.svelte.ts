
// export const rune = <T>(initialValue: T) => {
//     let _rune = $state(initialValue);
//     return {
//       get value() {
//         return _rune;
//       },
//       set value(v: T) {
//         _rune = v;
//       }
//     };
//   };


export const subTitle = $state({text: ""});
export const loggedInUser = $state({email: ""});