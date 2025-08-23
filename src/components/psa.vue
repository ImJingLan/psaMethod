<template>
  <v-container class="pa-2 container">
    <v-row>
      <v-col cols="12" class="text-center">
        <h1>{{ $t("title") }}</h1>
      </v-col>
    </v-row>

    <div>
      <v-row>
        <v-col cols="12" class="text-center pa-2">
          <!-- 左侧栏 -->
          <v-select
            :label="$t('language')"
            v-model="locale"
            :items="[
              { title: '中文', value: 'zh' },
              { title: 'English', value: 'en' },
            ]"
            outlined
            hide-details
          ></v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6" class="pa-2">
          <v-text-field
            v-model="startingSensitivity"
            :label="$t('startingSensitivity')"
            outlined
            type="number"
          ></v-text-field>

          <v-radio-group
            v-model="iteration1"
            :label="$t('iteration') + ' 1:'"
            inline
          >
            <v-radio :label="$t('lower')" value="lower"></v-radio>
            <v-radio :label="$t('higher')" value="higher"></v-radio>
          </v-radio-group>

          <transition name="fade" appear>
            <v-radio-group
              v-model="iteration2"
              :label="$t('iteration') + ' 2:'"
              inline
              v-if="iteration1 !== null"
            >
              <v-radio :label="$t('lower')" value="lower"></v-radio>
              <v-radio :label="$t('higher')" value="higher"></v-radio>
            </v-radio-group>
          </transition>

          <transition name="fade" appear>
            <v-radio-group
              v-model="iteration3"
              :label="$t('iteration') + ' 3:'"
              inline
              v-if="iteration2 !== null"
            >
              <v-radio :label="$t('lower')" value="lower"></v-radio>
              <v-radio :label="$t('higher')" value="higher"></v-radio>
            </v-radio-group>
          </transition>

          <transition name="fade" appear>
            <v-radio-group
              v-model="iteration4"
              :label="$t('iteration') + ' 4:'"
              inline
              v-if="iteration3 !== null"
            >
              <v-radio :label="$t('lower')" value="lower"></v-radio>
              <v-radio :label="$t('higher')" value="higher"></v-radio>
            </v-radio-group>
          </transition>

          <transition name="fade" appear>
            <v-radio-group
              v-model="iteration5"
              :label="$t('iteration') + ' 5:'"
              inline
              v-if="iteration4 !== null"
              ><v-radio :label="$t('lower')" value="lower"></v-radio>
              <v-radio :label="$t('higher')" value="higher"></v-radio>
            </v-radio-group>
          </transition>

          <transition name="fade" appear>
            <v-radio-group
              v-model="iteration6"
              :label="$t('iteration') + ' 6:'"
              inline
              v-if="iteration5 !== null"
              ><v-radio :label="$t('lower')" value="lower"></v-radio>
              <v-radio :label="$t('higher')" value="higher"></v-radio>
            </v-radio-group>
          </transition>

          <transition name="fade" appear>
            <v-radio-group
              v-model="iteration7"
              :label="$t('iteration') + ' 7:'"
              inline
              v-if="iteration6 !== null"
              ><v-radio :label="$t('lower')" value="lower"></v-radio>
              <v-radio :label="$t('higher')" value="higher"></v-radio>
            </v-radio-group>
          </transition>
        </v-col>

        <!-- 右侧栏 -->
        <v-col cols="12" md="6" class="pa-2">
          <v-table>
            <thead>
              <tr>
                <th class="text-left">{{ $t("lower") }}</th>
                <th class="text-left">{{ $t("base") }}</th>
                <th class="text-left">{{ $t("higher") }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in sensTable" :key="item.lower">
                <td>{{ item.lower }}</td>
                <td>{{ item.base }}</td>
                <td>{{ item.higher }}</td>
              </tr>
            </tbody>
          </v-table>
          <transition name="fade" mode="out-in">
            <h2 v-if="result !== null" :key="result">
              {{ $t("result") }}: {{ result }}
            </h2>
          </transition>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useI18n } from "vue-i18n";

const { locale } = useI18n();

// 输入数据
const startingSensitivity = ref(0);
const iteration1 = ref(null);
const iteration2 = ref(null);
const iteration3 = ref(null);
const iteration4 = ref(null);
const iteration5 = ref(null);
const iteration6 = ref(null);
const iteration7 = ref(null);

// 输出数据
// const tableHeader = ["Lower", "Base", "Higher"]; // Unused variable
const sensTable = ref([{ lower: 0, base: 0, higher: 0 }]);

var result = ref(null);

// 辅助函数：四舍五入到小数点后三位
function roundToThreeDecimals(value: number): number {
  return Math.round(value * 1000) / 1000;
}

// 监听输入变化并自动计算
watch(
  [
    startingSensitivity,
    iteration1,
    iteration2,
    iteration3,
    iteration4,
    iteration5,
    iteration6,
    iteration7,
  ],
  () => {
    // 当初始灵敏度输入框为空时，强制设置为0
    if (
      startingSensitivity.value.toString() === "" ||
      startingSensitivity.value === null ||
      isNaN(parseFloat(startingSensitivity.value.toString()))
    ) {
      startingSensitivity.value = 0;
    }
    var basic = parseFloat(startingSensitivity.value.toString());
    var highMultiplier = 1.5;
    var lowMultiplier = 0.5;
    var _sensTable = [
      {
        lower: roundToThreeDecimals(basic * lowMultiplier),
        base: roundToThreeDecimals(basic),
        higher: roundToThreeDecimals(basic * highMultiplier),
      },
    ];
    if (iteration1.value !== null) {
      var base = roundToThreeDecimals(
        ((iteration1.value === "lower"
          ? _sensTable[0].lower
          : _sensTable[0].higher) +
          _sensTable[0].base) /
          2,
      );
      _sensTable[1] = {
        lower: roundToThreeDecimals(base * lowMultiplier),
        base: roundToThreeDecimals(base),
        higher: roundToThreeDecimals(base * highMultiplier),
      };

      if (iteration2.value !== null) {
        lowMultiplier = 0.6;
        highMultiplier = 1.4;
        var base = roundToThreeDecimals(
          ((iteration2.value === "lower"
            ? _sensTable[1].lower
            : _sensTable[1].higher) +
            _sensTable[1].base) /
            2,
        );
        _sensTable[2] = {
          lower: roundToThreeDecimals(base * lowMultiplier),
          base: roundToThreeDecimals(base),
          higher: roundToThreeDecimals(base * highMultiplier),
        };

        if (iteration3.value !== null) {
          lowMultiplier = 0.7;
          highMultiplier = 1.3;
          var base = roundToThreeDecimals(
            ((iteration3.value === "lower"
              ? _sensTable[2].lower
              : _sensTable[2].higher) +
              _sensTable[2].base) /
              2,
          );
          _sensTable[3] = {
            lower: roundToThreeDecimals(base * lowMultiplier),
            base: roundToThreeDecimals(base),
            higher: roundToThreeDecimals(base * highMultiplier),
          };

          if (iteration4.value !== null) {
            lowMultiplier = 0.8;
            highMultiplier = 1.2;
            var base = roundToThreeDecimals(
              ((iteration4.value === "lower"
                ? _sensTable[3].lower
                : _sensTable[3].higher) +
                _sensTable[3].base) /
                2,
            );
            _sensTable[4] = {
              lower: roundToThreeDecimals(base * lowMultiplier),
              base: roundToThreeDecimals(base),
              higher: roundToThreeDecimals(base * highMultiplier),
            };

            if (iteration5.value !== null) {
              lowMultiplier = 0.9;
              highMultiplier = 1.1;
              var base = roundToThreeDecimals(
                ((iteration5.value === "lower"
                  ? _sensTable[4].lower
                  : _sensTable[4].higher) +
                  _sensTable[4].base) /
                  2,
              );
              _sensTable[5] = {
                lower: roundToThreeDecimals(base * lowMultiplier),
                base: roundToThreeDecimals(base),
                higher: roundToThreeDecimals(base * highMultiplier),
              };

              if (iteration6.value !== null) {
                lowMultiplier = 0.95;
                highMultiplier = 1.05;
                var base = roundToThreeDecimals(
                  ((iteration6.value === "lower"
                    ? _sensTable[5].lower
                    : _sensTable[5].higher) +
                    _sensTable[5].base) /
                    2,
                );
                _sensTable[6] = {
                  lower: roundToThreeDecimals(base * lowMultiplier),
                  base: roundToThreeDecimals(base),
                  higher: roundToThreeDecimals(base * highMultiplier),
                };
                if (iteration7.value !== null) {
                  result.value = roundToThreeDecimals(
                    ((iteration7.value === "lower"
                      ? _sensTable[6].lower
                      : _sensTable[6].higher) +
                      _sensTable[6].base) /
                      2,
                  ) as any;
                }
              }
            }
          }
        }
      }
    }
    sensTable.value = _sensTable;
  },
  { immediate: true },
);
</script>

<style scoped>
/* 渐变动画样式 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.container {
  max-width: 50vw;
}

@media (max-width: 768px) {
  .container {
    max-width: 85%;
  }
}
</style>
